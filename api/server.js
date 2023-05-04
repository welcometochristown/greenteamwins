const express = require("express");
const cors = require("cors");
const { query, queryMany, insert, update, truncate, updateMany } = require('./database')

const Config = require("./config");

const Game = require('./models/gamemodel')
const Player = require('./models/playermodel')

var app = express();

app.use(cors());
app.use(express.json());

app.listen(Config.port, () => {
    console.log(`Server running on port ${Config.port}`);
});

///////////
// GAME
///////////

//get all games
app.get("/game", async (req, res) => {
    const result = await queryMany(Game);
    res.send(result);
});

//get game by id
app.get("/game/:code", async (req, res) => {
    const result = await query(Game, {code: req.params.code});
    res.send(result);
});

//new game
app.put("/game", async (req, res) => {
    const obj = new Game(req.body)

    obj.code = (+new Date).toString(36);
    obj.started = false;
    obj.round = 0;
    obj.deck = createDeckString();

    await insert(obj);
    res.send(obj)
});

//update a game
app.post("/game", async (req, res) => {
    const obj = new Game(req.body);
    await update(Game, obj);
    res.send(obj);
});

app.delete("/game/all", async (req, res) => {
    await truncate(Game);
    res.sendStatus(200);
});

app.get("/game/:code/start", async(req, res) => {
    let game = await query(Game, {code: req.params.code});
    await goNextRound(game);
    res.send(game);
});

app.get("/game/:code/skipround", async(req, res) => {
    let game = await query(Game, {code: req.params.code});
    await goNextRound(game, true);
    res.send(game);
});

app.get("/game/:code/finishround", async(req, res) => {
    let game = await query(Game, {code: req.params.code});
    await updatePlayerScores();
    await goNextRound(game);
    res.send(game);
});

const groupAndCount = (items) => {
    const r = items.reduce((results, item) => {
        const currCount = results[item] ?? 0;
        return {
            ...results,
            [item]: currCount + 1,
        };
    }, {} );
    
    const results = []
    for(var p in r)
    {
    	results.push(
      	{
        	value:p, 
            count:r[p]
        }
     	);
    }
    return results
}

const goNextRound = async (game, skipped = false) => {
    let drawn = drawCard(game.deck)

    game.started = true;
    game.card = drawn.card;
    game.deck = drawn.deck;
    game.round++;

    await update(Game, game);
    await updateMany(Player,  [{ $set: { lastAnswer: (skipped ? null : "$answer") , answer : null } }])
}

const updatePlayerScores = async () => {
    //process results of all players
    let players = await queryMany(Player);

    const answers = players.map(n => n.answer)
    const grouped = groupAndCount(answers)

    grouped.sort((a,b) => b.count-a.count)

    const bestAnswer = grouped[0]

    //everyone had different guesses
    if(grouped.length == answers.length)
    {
        //move everyone to the orange team
        players.forEach(async (p) => {
            p.team = "orange"
            await update(Player, p);
        })

    }
    //multiple correct answers
    else if(grouped.filter(n => n.count === bestAnswer.count).length > 1)
    {
        // nobody moves
        //green gets 2 points
        players.filter(n => n.team === "green")
            .forEach(async (p) => {
                    p.points += 2;
                    await update(Player, p);
                })
    }
    //one correct answer
    else
    {
        //people with best answer move to green team, get 1 point
        //people already on green get 2 points
        players.filter(n => n.answer === bestAnswer.value)
            .forEach(async (p) => {

                    p.points += (p.team === "green" ? 2 : 1);
                    p.team = "green"
                    
                    await update(Player, p);
                })
                
        //other people move to orange. 
        players.filter(n => n.answer !== bestAnswer.value)
            .forEach(async (p) => {
                    p.team = "orange"
                    await update(Player, p);
                })
    }
}


///////////
// PLAYER
///////////

//get player by id
app.get("/player/:id", async (req, res) => {
    const result = await query(Player, {_id: req.params.id});
    res.send(result);
});

//get players by game
app.get("/players/:code", async (req, res) => {
    const result = await queryMany(Player, {game : req.params.code});
    res.send(result)
});

//get all players
app.get("/player", async (req, res) => {
    const result = await queryMany(Player);
    res.send(result);
});

//new player
app.put("/player", async (req, res) => {
    const obj = new Player(req.body)
    obj.points = 0;
    obj.team = "orange";

    await insert(obj);
    res.send(obj);
});

//update a player
app.post("/player", async (req, res) => {
    const obj = new Player(req.body);
    await update(Player, obj);
    res.send(obj);
});


app.delete("/player/all", async (req, res) => {
    await truncate(Player);
    res.sendStatus(200);
});

//////////////
// CARD STUFF
/////////////

const createDeckString = () => {
    const parts = []
    const types = ["MC", "EO", "MW"]

    for(var t in types)
        for(var x=0;x<10;x++)
            for(var y=0;y<7;y++)
                parts.push(`${types[t]}_${x.toString().padStart(2, '0')}_${y.toString().padStart(2, '0')}`)

    return parts.join("|")
}

const drawCard = (deck) => {
    //take a card off the deck
    const cards = deck.split("|")
    const index = Math.floor(Math.random() * cards.length)
    const card = cards.splice(index, 1)[0];
    Math.random()

    return {
        deck : cards.join("|"),
        card,
    };
}
const express = require("express");
const cors = require("cors");
const { query, queryMany, insert, update, truncate } = require('./database')

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

    console.log(obj)
    obj.code = (+new Date).toString(36);
    obj.started = false;
    obj.round = 0;
    obj.deck = createDeckString();

    await insert(req, obj);
    res.send(obj)
});

//update a game
app.post("/game", async (req, res) => {
    const obj = new Game(req.body);
    await update(req, obj);
    res.send(obj);
});

app.delete("/game/all", async (req, res) => {
    await truncate(Game);
    res.sendStatus(200);
});

app.get("/game/:code/nextround", async(req, res) => {
    let result = await query(Game, {code: req.params.code});
    result = takeCard(result)

    await update(req, Game);
    res.send(result);
});


///////////
// PLAYER
///////////

//get player by id
app.get("/player/:id", async (req, res) => {
    const result = query(Player, {_id: req.params.id});
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

    await insert(req, obj);
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

const takeCard = (game) => {
    //take a card off the deck
    const cards = game.deck.split("|")
    const card = cards.splice(0, 1);

    game.deck = cards.join("|")
    game.card = card;
    game.round++;

    return game;
}
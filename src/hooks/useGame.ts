import IGame from "@/models/game";
import { useEffect, useState } from "react";
import useInterval from "./useInterval"
import IPlayer from "@/models/player";
import ICard, { CardTypeEnum } from "@/models/card";

const useGame = () => {

    const [game, setGame] = useState<IGame>();
    const [card, setCard] = useState<ICard>();
    const [players, setPlayers] = useState<IPlayer[]>([]);

    const parseCard = (str : string | undefined)  : ICard | undefined => {
        if(!str) return undefined;

        // "00_00_00"
        // type_xx_yy
        const parts = str.split("_")
        const x = parseInt(parts[1])
        const y = parseInt(parts[2])

        const parseType = (t:string) => {
            switch(t)
            {
                case "MC" : return "MultiChoice"
                case "EO" : return "EitherOr"
                case "MW" : return "MissingWord"
            }
        }

        return {
            ident : {x, y},
            type : parseType(parts[0])!
        }
    }

    const setGameAndCard = (game : IGame) => {
        try{
            setGame(game);
            setCard(parseCard(game?.card))
        }catch(err)
        {
            console.log(err)
        }
      
    }

    useEffect(() => {
        console.log("game", game)
        console.log("card", card)
    }, [game, card])

    useInterval(() => {
        const poll = async () => {
            if(!game) return;

            try{
                const g : IGame = await fetch(`http://localhost:4000/game/${game.code}`)
                .then(response => response.json());

                if(JSON.stringify(game) !== JSON.stringify(g))
                setGameAndCard(g);

                const p : IPlayer [] = await fetch(`http://localhost:4000/players/${game.code}`)
                .then(response => response.json());
 
                if(players.length !== p.length)
                setPlayers(p);

            }catch(err)
            {
                console.log(err)
            }
          
        }

        poll();
        
    }, game ? 1000 : null);

    const createGameAsync = async (game : IGame) => {
        console.log("createGameAsync")
        try{
            const g = await fetch('http://localhost:4000/game', {
                method: 'PUT',
                body: JSON.stringify(game),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(response => response.json())
            
            setGameAndCard(g);
        }catch(err)
        {
            console.log(err)
        }
       
    }

    const loadGameAsync = async (code : string) => {
        try{
            const g = await fetch(`http://localhost:4000/game/${code}`)
                            .then(response => {
                                return response.json();
                            })

            setGameAndCard(g);
        }catch(err)
        {
            console.log(err) 
        } 
    }
 
    const updateGameAsync = async (newGame : IGame) => {
        const g = await fetch('http://localhost:4000/game', {
                method: 'POST',
                body: JSON.stringify(
                    newGame
                ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(response => response.json())
        setGameAndCard(g);
    }

    const startGameAsync = async () => {
        if(!game) return;

        await updateGameAsync ({
            ...game!, 
            started:true
        })
    }

    const nextRoundAsync = async () => {
        if(!game) return;
        
        const g = await fetch(`http://localhost:4000/game/${game.code}/nextround`)
        .then(response => response.json())

        setGameAndCard(g);
    }

    return { game, card, players, createGameAsync, loadGameAsync, startGameAsync, nextRoundAsync}
}

export default useGame;
import IPlayer from "@/models/player";
import { useEffect, useState } from "react";
import useInterval from "./useInterval";

export default function usePlayer () {
    const [player, setPlayer] = useState<IPlayer>();

    const poll = async () => {
        if(!player) return;

        const p : IPlayer = await fetch(`http://localhost:4000/player/${player._id}`)
                                        .then(response => response.json());

        if(JSON.stringify(player) !== JSON.stringify(p))
            setPlayer(p);            
    }

    useInterval(() => {
        poll(); 
    }, player ? 1000 : null);

    const createPlayerAsync = async (player : IPlayer) => {
        const p = await fetch('http://localhost:4000/player', {
                method: 'PUT',
                body: JSON.stringify(player),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(response => response.json())
        setPlayer(p);
    }

    const loadPlayerAsync = async (id : string) => {
        const p = await fetch(`http://localhost:4000/player/${id}`)
            .then(response =>  {
                return response.json()
            })
        setPlayer(p);
    }

    const updatePlayerAsync = async (newPlayer : IPlayer) => {
        const p = await fetch('http://localhost:4000/player', {
                method: 'POST',
                body: JSON.stringify(
                    newPlayer
                ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(response => response.json())
        setPlayer(p);
    }

    const setAnswer = async (answer:string) => {
        if(!player) return;

        await updatePlayerAsync ({
            ...player!, 
            answer
        })
    }



    return {player, createPlayerAsync, loadPlayerAsync, poll, setAnswer}
}
import { TeamEnum } from "@/models/team";
import Team from "./Team";
import GameCard from "./GameCard";
import IGame from "@/models/game";
import IPlayer from "@/models/player";
import { Button, Input } from "reactstrap";
import ICard from "@/models/card";
import { useEffect, useRef, useState } from "react";
import logo from "../images/logo.png";

interface IProps {
    game?: IGame;
    card?: ICard;
    player?: IPlayer;
    players?: IPlayer[];
    onSkipRound: () => void;
    onFinishRound: () => void;
    onSubmit: (answer: string) => void;
}

const Game: React.FC<IProps> = ({ game, card, player, players, onSkipRound, onFinishRound, onSubmit }) => {
    useEffect(() => {
        const answerValue = player?.answer ?? "";
        // answerRef.current!.value = answerValue;
    }, [player]);

    /*
        Needs to show - 
            Current Card
            Teams and their players (with scores)
            Accept Button
            Round Number X/Y
            Player name
    */

    const answerRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="logobox">
                <div>
                    <img src={logo.src} />
                </div>
            </div>

            <div className="centerbox">
                <div className="outerbox">
                    <div className="headerbox">
                        <div className="header-card">
                            <h1>Round {game?.round}</h1>
                        </div>
                        <div className="header-teams">teams-header</div>
                    </div>
                    <div className="cardteambox">
                        <div className="vcard">
                            <GameCard card={card} />
                        </div>
                        <div className="teambox">
                            <div className="team-green">
                                <Team
                                    team={TeamEnum.Green}
                                    players={players!.filter(
                                        (n) => n.team?.toLowerCase() === TeamEnum.Green.toLowerCase()
                                    )}
                                />
                            </div>
                            <div className="team-orange">
                                <Team
                                    team={TeamEnum.Orange}
                                    players={players!.filter(
                                        (n) => n.team?.toLowerCase() === TeamEnum.Orange.toLowerCase()
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="answer">answer</div>
                </div>
            </div>
            {/* 
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ backgroundColor: "white" }}>
          <Team
            team={TeamEnum.Green}
            players={players!.filter(
              (n) => n.team?.toLowerCase() === TeamEnum.Green.toLowerCase()
            )}
          />
          <Team
            team={TeamEnum.Orange}
            players={players!.filter(
              (n) => n.team?.toLowerCase() === TeamEnum.Orange.toLowerCase()
            )}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Round {game?.round}</h1>
      </div>

      <GameCard card={card} />

      <Input placeholder="Answer" innerRef={answerRef} />
      <div className="buttons">
        <Button
          onClick={() => onSubmit(answerRef.current?.value!)}
          disabled={!!player?.answer}
        >
          Submit
        </Button>
        <div>
          {player?.host ? (
            <Button onClick={onSkipRound}>Skip Round (No Points)</Button>
          ) : null}
        </div>
        <div>
          {player?.host ? (
            <Button
              onClick={onFinishRound}
              disabled={players?.some((n) => !n.answer)}
            >
              Finish Round
            </Button>
          ) : null}
        </div>
      </div> */}
        </>
    );
};

export default Game;

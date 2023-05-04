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

const Game: React.FC<IProps> = ({
  game,
  card,
  player,
  players,
  onSkipRound,
  onFinishRound,
  onSubmit,
}) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: 200,
          height: "auto",
        }}
      >
        <div>
          <img src={logo.src} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: 800,
            height: 600,
          }}
        >
          <div
            style={{
              backgroundColor: "orange",
              height: "10%",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: "pink",
                  width: "50%",
                }}
              >
                card-header
              </div>
              <div
                style={{
                  backgroundColor: "cyan",
                  width: "50%",
                }}
              >
                teams-header
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "green",
              height: "80%",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: "red",
                  width: "50%",
                }}
              >
                card
              </div>
              <div
                style={{
                  backgroundColor: "blue",
                  width: "50%",
                }}
              >
                teams
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "yellow",
              height: "10%",
            }}
          >
            answer
          </div>
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

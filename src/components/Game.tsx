import { TeamEnum } from "@/models/team";
import Team from "./Team";
import GameCard from "./GameCard";
import IGame from "@/models/game";
import IPlayer from "@/models/player";
import { Button } from "reactstrap";
import ICard from "@/models/card";

interface IProps {
  game?: IGame;
  card?: ICard;
  player?: IPlayer;
  players?: IPlayer[];

  onNextRound: () => void;
}

const Game: React.FC<IProps> = ({
  game,
  card,
  player,
  players,
  onNextRound,
}) => {
  /*
        Needs to show - 
            Current Card
            Teams and their players (with scores)
            Accept Button
            Round Number X/Y
            Player name
    */
  return (
    <>
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
      <GameCard card={card} />
      Deck:{game?.deck}
      <div>
        <h1>Round {game?.round}</h1>
      </div>
      <div>
        {player?.host ? (
          <Button onClick={onNextRound}>Next Round</Button>
        ) : null}
      </div>
    </>
  );
};

export default Game;

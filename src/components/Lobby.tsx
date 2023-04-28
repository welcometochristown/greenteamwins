import IGame from "@/models/game";
import IPlayer from "@/models/player";
import { Button } from "reactstrap";

interface IProps {
  game?: IGame;
  player?: IPlayer;
  players?: IPlayer[];

  onBeginGame: () => void;
}

const Lobby: React.FC<IProps> = ({ game, player, players, onBeginGame }) => {
  return (
    <>
      <div>Lobby for {game?.code}</div>
      <div>
        <b>Players</b>
        {players?.map((p, index) => (
          <div key={index}>{p.name}</div>
        ))}
      </div>
      {player?.host ? <Button onClick={onBeginGame}>Begin Game</Button> : null}
    </>
  );
};

export default Lobby;

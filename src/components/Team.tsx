import IPlayer from "@/models/player";
import { TeamEnum } from "@/models/team";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  List,
} from "reactstrap";

interface IProps {
  team: TeamEnum;
  players: IPlayer[];
}

const Team: React.FC<IProps> = ({ team, players }) => {
  return (
    <>
      {team}
      <List>
        {players.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </List>
    </>
  );
};

export default Team;

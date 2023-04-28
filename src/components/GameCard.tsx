import ICard from "@/models/card";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

interface IProps {
  card?: ICard;
}

const GameCard: React.FC<IProps> = ({ card }) => {
  return (
    <>
      <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Card subtitle
          </CardSubtitle>
          <CardText>{JSON.stringify(card)}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </>
  );
};

export default GameCard;

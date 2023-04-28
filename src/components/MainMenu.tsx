import useGame from "@/hooks/useGame";
import usePlayer from "@/hooks/usePlayer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";

interface IProps {}

const MainMenu: React.FC<IProps> = () => {
  const router = useRouter();

  const { game, createGameAsync, loadGameAsync } = useGame();
  const { player, createPlayerAsync } = usePlayer();

  const [code, setCode] = useState<string>();
  const [name, setName] = useState<string>();

  const [isHost, setIsHost] = useState<boolean | undefined>();

  useEffect(() => {
    //no game or player, then skip
    if (!game || !player) return;

    //once player and game exist, move to the game
    router.push(`/game/${game.code}?player=${player._id}`);
  }, [game, player]);

  useEffect(() => {
    //if game not yet created or player has been created then skip
    if (game === undefined || isHost === undefined || player) return;

    createPlayerAsync({
      name: name!,
      game: game.code!,
      host: isHost,
    });
  }, [game, isHost]);

  const handleJoinButtonClick = async () => {
    setIsHost(false);
    await loadGameAsync(code!);
  };

  const handleCreateButtonClick = async () => {
    setIsHost(true);
    await createGameAsync({ rounds: 10 });
  };

  return (
    <>
      <Input
        placeholder="Player Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleCreateButtonClick} disabled={!!isHost}>
        Create
      </Button>
      <Button onClick={handleJoinButtonClick} disabled={!!isHost}>
        Join
      </Button>
      <Input
        placeholder="Room Code"
        onChange={(e) => setCode(e.target.value)}
      />
    </>
  );
};

export default MainMenu;

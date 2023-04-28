import Game from "@/components/Game";
import Lobby from "@/components/Lobby";
import useGame from "@/hooks/useGame";
import usePlayer from "@/hooks/usePlayer";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IProps {}

const GamePage: React.FC<IProps> = () => {
  const router = useRouter();

  const { game, card, players, loadGameAsync, startGameAsync, nextRoundAsync } =
    useGame();

  const { player, loadPlayerAsync } = usePlayer();

  const code = router.query.code as string;
  const playerid = router.query.player as string;

  useEffect(() => {
    if (!code || !playerid) return;

    loadGameAsync(code);
    loadPlayerAsync(playerid);
  }, [code]);

  if (!game) return <>Loading</>;

  if (game.started === false)
    return (
      <Lobby
        game={game}
        player={player}
        players={players}
        onBeginGame={startGameAsync}
      />
    );

  return (
    <Game
      card={card}
      game={game}
      player={player}
      players={players}
      onNextRound={nextRoundAsync}
    />
  );
};

export default GamePage;

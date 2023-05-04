import Game from "@/components/Game";
import Lobby from "@/components/Lobby";
import useGame from "@/hooks/useGame";
import usePlayer from "@/hooks/usePlayer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "reactstrap";

interface IProps {}

const GamePage: React.FC<IProps> = () => {
  const router = useRouter();

  const {
    game,
    card,
    players,
    loadGameAsync,
    startGameAsync,
    skipRoundAsync,
    finishRoundAsync,
    poll: pollGame,
  } = useGame();

  const { player, loadPlayerAsync, poll: pollPlayer, setAnswer } = usePlayer();

  const code = router.query.code as string;
  const playerid = router.query.player as string;

  useEffect(() => {
    if (!code || !playerid) return;

    loadGameAsync(code);
    loadPlayerAsync(playerid);
  }, [code]);

  const handleRefresh = () => {
    pollGame();
    pollPlayer();
  };

  if (!game) return <>Loading</>;

  if (game.started === false)
    return (
      <>
        <Lobby
          game={game}
          player={player}
          players={players}
          onBeginGame={startGameAsync}
        />
      </>
    );

  return (
    <>
      <Game
        card={card}
        game={game}
        player={player}
        players={players}
        onSkipRound={skipRoundAsync}
        onFinishRound={finishRoundAsync}
        onSubmit={setAnswer}
      />
    </>
  );
};

export default GamePage;

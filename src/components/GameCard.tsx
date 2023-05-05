import ICard, { CARD_DIMENSION_HEIGHT_PIXELS, CARD_DIMENSION_WIDTH_PIXELS } from "@/models/card";
import { useEffect, useRef } from "react";
import useCard from "@/hooks/useCard";

interface IProps {
    card?: ICard;
}

const GameCard: React.FC<IProps> = ({ card }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { getImageSrc } = useCard();

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (!card || !canvasRef || !canvasRef.current) return;

        const image = new Image();
        image.src = getImageSrc(card)!;

        image.onload = () => {
            ctx.drawImage(
                image,
                CARD_DIMENSION_WIDTH_PIXELS * card.ident.x,
                CARD_DIMENSION_HEIGHT_PIXELS * card.ident.y,
                CARD_DIMENSION_WIDTH_PIXELS,
                CARD_DIMENSION_HEIGHT_PIXELS,
                0,
                0,
                CARD_DIMENSION_WIDTH_PIXELS / 2,
                CARD_DIMENSION_HEIGHT_PIXELS / 2
            );
        };
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        draw(context!);
    }, [canvasRef, card]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="game-card-canvas"
                width={CARD_DIMENSION_WIDTH_PIXELS / 2}
                height={CARD_DIMENSION_HEIGHT_PIXELS / 2}
            />
        </>
    );
};

export default GameCard;

export enum CardTypeEnum {
    MultiChoice = "MultiChoice",
    EitherOr = "EitherOr",
    MissingWord = "MissingWord"
}

export type CardType = CardTypeEnum.MultiChoice | CardTypeEnum.EitherOr | CardTypeEnum.MissingWord | string

export const CARD_DIMENSION_WIDTH_PIXELS = 500;
export const CARD_DIMENSION_HEIGHT_PIXELS = 697;

export const CARD_WIDTH_COUNT = 10;
export const CARD_HEIGHT_COUNT = 7;

export interface ICardIdent {
    x:number,
    y:number
}

export default interface ICard {
    type: CardType,
    ident: ICardIdent
}
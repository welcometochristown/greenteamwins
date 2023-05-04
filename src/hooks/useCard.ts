import ICard, { CardTypeEnum } from "@/models/card";

import MultiChoice from '../images/cards_multi.png'
import EitherOr from '../images/cards_option.png'
import MissingWord from '../images/cards_missing.png'

const useCard = () => {

    const getImageSrc = (card : ICard) => {
        switch(card.type)
        {
            case CardTypeEnum.MultiChoice: return MultiChoice.src;
            case CardTypeEnum.EitherOr: return EitherOr.src;
            case CardTypeEnum.MissingWord: return MissingWord.src;
        }
    }

    return {getImageSrc}
}

export default useCard;
export default interface IGame {
    _id?: string;
    code?: string;
    round?: number;
    started?: boolean;
    card?: string;
    deck?: string;
    
    rounds: number;
}
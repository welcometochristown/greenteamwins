export default interface IPlayer {
    _id? : string;
    team?: string;
    points?: number;
    answer?: string;
    lastAnswer?: string;
    host: boolean;
    name: string;
    game: string;
}

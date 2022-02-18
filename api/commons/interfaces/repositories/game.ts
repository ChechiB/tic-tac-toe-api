interface IGameResponse{
    id: string,
    hash: string,
    status: boolean,
    board: string[],
    players: {
        playerOneId: string,
        playerTwoId: string,
        nextPlayer: string,
    }
}
export interface IGameRepository {
    create(hash: string): Promise<IGameResponse>;
    update(hash: string, data: any): Promise<IGameResponse>;
    get(hash:string): Promise<IGameResponse>;
}
interface IBoard{
    cell0: string | null,
    cell1: string | null,
    cell2: string | null,
    cell3: string | null,
    cell4: string | null,
    cell5: string | null,
    cell6: string | null,
    cell7: string | null,
    cell8: string | null,
}

export interface IGameResponse{
    id?: string,
    hash: string,
    status: boolean,
    board: IBoard,
    players: {
        playerOneId: string,
        playerTwoId: string,
        nextPlayer: string,
    }
}
export interface IGameRepository {
    create(player: IGameResponse): Promise<IGameResponse>;
    update(hash: string, data: any): Promise<IGameResponse>;
    get(hash:string): Promise<IGameResponse>;
}
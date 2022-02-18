export interface IPlayerResponse{
    id: string,
    symbol: string
}

export interface IPlayerRepository{
    create(name: string): Promise<IPlayerResponse>;
    updateById(id: string, data: any): Promise<IPlayerResponse>;
    get(id:string):Promise<IPlayerResponse>;
}
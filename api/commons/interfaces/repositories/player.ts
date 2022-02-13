export interface IPlayerRepository{
    create(name: string, symbol: boolean): Promise<any>
}
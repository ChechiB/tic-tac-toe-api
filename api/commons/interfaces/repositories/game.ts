export interface IGameRepository {
    create(hash: string): Promise<any>
}
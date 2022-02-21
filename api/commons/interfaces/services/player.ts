import { PlayerControllerDependencies } from "@controllers/create_player";

export interface IPlayerService{
    create(dependencies: PlayerControllerDependencies["repositories"], name: string): Promise<any>,
    setSymbol(dependencies: PlayerControllerDependencies["repositories"], players: any): Promise<any>,
    getPlayer(dependencies: PlayerControllerDependencies["repositories"], playerId: string): Promise<any>
}
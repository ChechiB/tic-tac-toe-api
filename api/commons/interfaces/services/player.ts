import { PlayerControllerDependencies } from "@controllers/create_player";

export interface IPlayerService{
    create(dependencies: PlayerControllerDependencies["repositories"], name: string): Promise<any>
}
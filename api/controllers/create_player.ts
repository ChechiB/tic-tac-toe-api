import { IControllerDependencies } from "api/commons/interfaces/controller_deps";
import { IPlayerRepository } from "api/commons/interfaces/repositories/player";
import { IPlayerService } from "api/commons/interfaces/services/player";

// DI
interface PlayerServiceDeps {
    playerService: IPlayerService
}

interface PlayerRepositoryDeps{
    playerRepository: IPlayerRepository
}

export type PlayerControllerDependencies = IControllerDependencies<PlayerServiceDeps,PlayerRepositoryDeps>

export const createPlayerController= (deps: PlayerControllerDependencies) => {
    return async function handler(req, res, next) {
        try {
            const { services: { playerService }, repositories: { playerRepository }} = deps;
            const {player_name} = req.body;
            const response = await playerService.create({playerRepository},player_name);
            return res.send(response);
        } catch (error) {
            next(error)
        }
    }
}
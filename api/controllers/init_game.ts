import { IControllerDependencies } from "api/commons/interfaces/controller_deps";
import { IGameRepository } from "api/commons/interfaces/repositories/game";
import { IGameService } from "api/commons/interfaces/services/game";

// DI
interface GameServiceDeps {
    gameService: IGameService
}

interface GameRepositoryDeps{
    gameRepository: IGameRepository
}

export type GameControllerDependencies = IControllerDependencies<GameServiceDeps,GameRepositoryDeps>

export const createGameController= (deps: GameControllerDependencies) => {
    return async function handler(req, res, next) {
        try {
            const { services: { gameService }, repositories: { gameRepository }} = deps;
            const {player_name} = req.body;
            const response = await gameService.create({gameRepository},player_name);
            return res.send(response);
        } catch (error) {
            next(error)
        }
    }
}
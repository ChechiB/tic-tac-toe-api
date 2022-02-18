import { IControllerDependencies } from "api/commons/interfaces/controllers/controller_deps";
import { IGameRepository } from "../commons/interfaces/repositories/game";
import { IPlayerRepository } from "../commons/interfaces/repositories/player";
import { IGameService } from "../commons/interfaces/services/game";
import { IPlayerService } from "../commons/interfaces/services/player";

interface GameServiceDeps {
    gameService: IGameService,
    playerService: IPlayerService
}

interface GameRepositoryDeps{
    gameRepository: IGameRepository,
    playerRepository: IPlayerRepository
}

export type GameControllerDependencies = IControllerDependencies<GameServiceDeps,GameRepositoryDeps>

export const createGameController= (deps: GameControllerDependencies) => {
    return async function handler(req, res, next) {
        try {
            const { services: { gameService }, repositories: { gameRepository }} = deps;
            const {player_name} = req.body;
            // TODO deleted gameService from gameService INterface
            const response = await gameService.create({gameRepository},player_name);
            return res.send(response);
        } catch (error) {
            next(error)
        }
    }
}
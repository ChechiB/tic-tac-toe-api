import { IControllerDependencies } from "../commons/interfaces/controllers/controller_deps";
import { CommonResponse, StatusType } from "../commons/interfaces/generic_response";
import { IGameRepository, IGameResponse } from "../commons/interfaces/repositories/game";
import { IPlayerRepository } from "../commons/interfaces/repositories/player";
import { IGameService } from '../commons/interfaces/services/game';
import { IPlayerService } from "../commons/interfaces/services/player";

interface GameServiceDeps {
    gameService: IGameService,
    playerService: IPlayerService
}

interface GameRepositoryDeps {
    gameRepository: IGameRepository,
    playerRepository: IPlayerRepository
}

export type GameControllerDependencies = IControllerDependencies<GameServiceDeps, GameRepositoryDeps>

export const createGameController = (deps: GameControllerDependencies) => {
    return async function handler(req, res, next) {
        try {
            const { services: { gameService }, repositories: { gameRepository } } = deps;
            const player= req.body;
            const game = await gameService.create({ gameRepository }, player);
            const response = new CommonResponse<IGameResponse>({
                status: StatusType.SUCCESS,
                data: game
            }) 
            return res.send(response);
        } catch (error) {
            next(error)
        }
    }
}
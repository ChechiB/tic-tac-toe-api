import { IBoardResponse } from "../commons/interfaces/board";
import { CommonResponse, StatusType } from "../commons/interfaces/generic_response";
import { IGameRepository } from "../commons/interfaces/repositories/game";
import { IGameService } from "../commons/interfaces/services/game";
import { IControllerDependencies } from '../commons/interfaces/controllers/controller_deps';

interface GameServiceDeps {
    gameService: IGameService,
}

interface GameRepositoryDeps{
    gameRepository: IGameRepository,
}

type JoinGameControlerDependencies = IControllerDependencies<GameServiceDeps, GameRepositoryDeps>;
export const joinGameController = (dependencies: JoinGameControlerDependencies) => {
    return async function handler(res, req, next) {
        try {
            const { services: {gameService}, repositories: {gameRepository}} = dependencies;
            const { hash } = req.query;
            const { playerId } = req.body;
            const game = gameService.join({gameRepository}, hash, playerId);
            //validar cual seria realmente el  response
            const response = new CommonResponse<IBoardResponse>({
                status: StatusType.SUCCESS,
                data: game
            })
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }
}
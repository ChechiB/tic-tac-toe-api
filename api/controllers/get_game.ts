import { IControllerDependencies } from "../commons/interfaces/controllers/controller_deps";
import { CommonResponse, StatusType } from "../commons/interfaces/generic_response";
import { IGameRepository } from "../commons/interfaces/repositories/game";
import { IGameService } from "../commons/interfaces/services/game";
import { IBoardResponse } from '../commons/interfaces/board';
interface GameServiceDeps {
    gameService: IGameService,
}

interface GameRepositoryDeps{
    gameRepository: IGameRepository,
}

export type GameControllerDependencies = IControllerDependencies<GameServiceDeps,GameRepositoryDeps>

export const getGameController= (deps: GameControllerDependencies) => {
    return async function handler(req, res, next) {
        try {
            const { services: { gameService }, repositories: { gameRepository }} = deps;            
            const { hash } = req.params;
            const game = await gameService.getBoardStatus({gameRepository},hash);            
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
import { IControllerDependencies } from "../commons/interfaces/controllers/controller_deps";
import { CommonResponse, StatusType } from "../commons/interfaces/generic_response";
import { IGameRepository, IGameResponse } from "../commons/interfaces/repositories/game";
import { IGameService } from '../commons/interfaces/services/game';
interface GameServiceDeps {
    gameService: IGameService,
}

interface GameRepositoryDeps{
    gameRepository: IGameRepository,
}

export type GameControllerDependencies = IControllerDependencies<GameServiceDeps,GameRepositoryDeps>

export const initGameController= (deps: GameControllerDependencies) => {
    return async function handler(req, res, next) {
        try {
            const { services: { gameService }, repositories: { gameRepository }} = deps;
            const { playerName } = req.body;
            const { hash } = req.query;
            const game = await gameService.init({gameRepository},hash,playerName);
            const response = new CommonResponse<IGameResponse>({
                status: StatusType.SUCCESS,
                data: game
            })
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }
}
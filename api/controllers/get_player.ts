import { IControllerDependencies } from "../commons/interfaces/controllers/controller_deps";
import { CommonResponse, StatusType } from "../commons/interfaces/generic_response";
import { IBoardResponse } from '../commons/interfaces/board';
import { IPlayerService } from "api/commons/interfaces/services/player";
import { IPlayerRepository } from "api/commons/interfaces/repositories/player";

interface PlayerServiceDeps {
    playerService: IPlayerService,
}

interface PlayerRepositoryDeps{
    playerRepository: IPlayerRepository,
}

export type PlayerControllerDependencies = IControllerDependencies<PlayerServiceDeps,PlayerRepositoryDeps>

export const getPlayerController= (deps: PlayerControllerDependencies) => {
    return async function handler(req, res, next) {
        try {
            const { services: { playerService }, repositories: { playerRepository }} = deps;            
            const { id } = req.params;
            const player = await playerService.getPlayer({playerRepository},id);            
            const response = new CommonResponse<IBoardResponse>({
                status: StatusType.SUCCESS,
                data: player
            })            
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }
}
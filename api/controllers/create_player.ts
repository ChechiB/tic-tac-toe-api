import { IControllerDependencies } from "../commons/interfaces/controllers/controller_deps";
import { CommonResponse, StatusType } from "../commons/interfaces/generic_response";
import { IPlayerRepository, IPlayerResponse } from "../commons/interfaces/repositories/player";
import { IPlayerService } from "../commons/interfaces/services/player";

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
            const {playerName} = req.body;            
            const player = await playerService.create({playerRepository},playerName);
            const response = new CommonResponse<IPlayerResponse>({
                status: StatusType.SUCCESS,
                data: player
            })     
            res.status(200).json(response);   
        } catch (error) {
            next(error)
        }
    }
}
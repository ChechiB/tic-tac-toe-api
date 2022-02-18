import CustomError from '../commons/custom_error';
import { IGameRepository } from '../commons/interfaces/repositories/game';

export interface IMiddlewareCheckGameStatus{
    repositories: {
        gameRepository: IGameRepository
    }
}

export const checkGameStatusMiddleware = (deps: IMiddlewareCheckGameStatus) =>
    {
        return async function checkGameStatus(req, res, next){
                const { repositories: { gameRepository } } = deps;
                const hash = "bla"; //ver donde va a venir
                const { status } = await gameRepository.get(hash); 

                if (status) {
                    return next();
                }
                return next(new CustomError(400, "Player not allowed"))
        
    }
}
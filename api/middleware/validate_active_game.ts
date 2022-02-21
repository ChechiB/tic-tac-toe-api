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
                const {hash} = req.params; 
                const game = await gameRepository.get(hash); 

                if (game) {
                    return next();
                }
                return next(new CustomError(400, "Nonexistent Game", "C05"))
        
    }
}
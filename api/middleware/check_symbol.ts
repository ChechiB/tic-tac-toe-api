import CustomError from '../commons/custom_error';
import { IPlayerRepository } from '../commons/interfaces/repositories/player';

export interface IMiddlewareCheckSymbolPlayer{
    repositories: {
        playerRepository: IPlayerRepository
    }
}

export const checkSymbolPlayerMiddleware = (deps: IMiddlewareCheckSymbolPlayer) => {
        return async function checkCurrentSymbolPlayer(req, res, next) {
            const { repositories: { playerRepository }} = deps;
            const { players: {
                p1,
                p2
            } } = req.body;

            const playerOne = await playerRepository.get(p1);
            const playerTwo = await playerRepository.get(p2);
            
            if ( playerOne.symbol || playerTwo.symbol ){
                return next(new CustomError(400, "Symbols already set"));
            }
    
            return next();
    }
}
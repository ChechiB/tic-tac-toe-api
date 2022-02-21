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
                playerOneId,
                playerTwoId
            } } = req.body;
            
            const playerOne = await playerRepository.get(playerOneId);
            const playerTwo = await playerRepository.get(playerTwoId);
            
            if ( playerOne?.symbol || playerTwo?.symbol ){
                return next(new CustomError(400, "Symbols already set", "CE04"));
            }
    
            return next();
    }
}
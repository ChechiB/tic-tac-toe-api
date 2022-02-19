import CustomError from '../commons/custom_error';
import { IGameRepository } from '../commons/interfaces/repositories/game';
import { IPlayerRepository } from '../commons/interfaces/repositories/player';

export interface IMiddlewareCheckCurrentPlayer{
    repositories: {
        gameRepository: IGameRepository,
        playerRepository: IPlayerRepository
    }
}

export const checkCurrentPlayerMiddleware = (deps: IMiddlewareCheckCurrentPlayer) => {
        return async function checkCurrentPlayer(req, res, next) {
            const { repositories: { playerRepository, gameRepository}} = deps;
            const hash = res.params;
            const playerId = res.body;
            const { players } = await gameRepository.get(hash);

            // game without players
            if (!players.playerOneId && !players.playerTwoId){
                return next();
            }
            const isCurrentPlayer = Object.values(players).find(e => e === playerId); // players.playerOneId === playerId || players.playerTwoId === playerId 
    
            if (!isCurrentPlayer) {
                return next(new CustomError(400, "Player is not the current player"));
            }
            // Check symbol
            const playerSymbol = "";
            const { symbol } = await playerRepository.get(hash);
            if ( playerSymbol !== symbol ){
                return next(new CustomError(400, "Incorrect Symbol"));
            }
    
            return next();
    }
}
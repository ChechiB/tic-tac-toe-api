//create game
//update game
// get hash
import { IGameRepository } from 'api/commons/interfaces/repositories/game';
import Game from '../models/game';

export const gameRepository: IGameRepository = {
    async create(hash: string){
        const body = {
            hash,
            status: false,
            nextPlayer: null
        }
    
        const game = new Game(body);
        return game.save();
    }
}
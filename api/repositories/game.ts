import { IGameRepository } from '../commons/interfaces/repositories/game';
import Game from '../models/game';

export const gameRepository: IGameRepository = {
    async create(body: any){
        const game = new Game(body);
        const test = await game.save();
        console.log(test);
        return test;
    },

    async update(hash,data){
        return Game.findOneAndUpdate({hash},data,{returnNewDocument: true});
    },

    async get(hash){        
        return Game.findOne({hash});
    }
}
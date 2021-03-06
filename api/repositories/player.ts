import { IPlayerRepository } from '../commons/interfaces/repositories/player';
import Player from '../models/player';
export const playerRepository: IPlayerRepository = {
    async create(playerName: string){
        const player = new Player({name: playerName});
        return player.save();
    },

    async updateById(playerId, data){                
        return Player.findOneAndUpdate({_id: playerId}, { $set: { 
            ...data
          }}, {returnDocument: 'after'});
    },

    async get(id){
        return Player.findById(id);
    }
} 
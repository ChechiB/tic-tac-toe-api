import { IPlayerRepository } from 'api/commons/interfaces/repositories/player';
import Player from '../models/player';
export const playerRepository: IPlayerRepository = {
    async create(playerName: string, symbol: boolean){
        const player = new Player({name: playerName, symbol});
        return player.save();
    }
} 
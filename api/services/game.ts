import { generateHash } from '../commons/utils/hash';
import { IGameService } from '../commons/interfaces/services/game';

//Objeto con todas las funciones ofrecidas por el servicio
// Solo el controlador es uno por cada request
export const gameService: IGameService = {
    async create( dependencies, playerName){
        //create hash
        const { gameRepository }= dependencies;
        const hash = generateHash(playerName);
        const response = await gameRepository.create(hash);
        return response;
    }
}
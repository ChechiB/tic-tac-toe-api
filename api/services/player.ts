import { IPlayerService } from '../commons/interfaces/services/player';

export const playerService: IPlayerService = {
    async create(dependencies, name: string){
        const { playerRepository } = dependencies;       
        const response = await playerRepository.create(name);        
        return response;
    },

    async setSymbol(dependencies, players){
        const { playerRepository } = dependencies;
        const { playerOneId, playerTwoId } = players;
        const { playerOneSymbol, playerTwoSymbol } = generateSymbol();
        
        const playerOne = await playerRepository.updateById(playerOneId, {symbol: playerOneSymbol});
        const playerTwo = await playerRepository.updateById(playerTwoId, {symbol: playerTwoSymbol});   
             
        return {
            players: {
                playerOne,
                playerTwo
            }
        };
    },

    async getPlayer(dependencies, playerId){
        const { playerRepository } = dependencies;
        const player = await playerRepository.get(playerId);
        return player;
    }
}

const generateSymbol = () => {
    if (Math.random() < 0.5) {
        return {
            playerOneSymbol: 'X',
            playerTwoSymbol: 'O'
        }
    }

    return {
        playerOneSymbol: 'O',
        playerTwoSymbol: 'X'
    }
}



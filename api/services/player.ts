import { IPlayerService } from '../commons/interfaces/services/player';

export const playerService: IPlayerService = {
    async create(dependencies, name: string){
        const { playerRepository } = dependencies;
        console.log(name);
        
        const response = await playerRepository.create(name);
        return response;
    },

    async setSymbol(dependencies, players){
        const { playerRepository } = dependencies;
        const { p1, p2 } = players;
        const { playerOneSymbol, playerTwoSymbol } = generateSymbol();
        const playerOne = await playerRepository.updateById(p1, {symbol: playerOneSymbol});
        const playerTwo = await playerRepository.updateById(p2, {symbol: playerTwoSymbol});        
        return {
            players: {
                playerOne,
                playerTwo
            }
        };
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



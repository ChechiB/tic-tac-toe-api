import { IPlayerService } from '../commons/interfaces/services/player';

export const playerService: IPlayerService = {
    async create(dependencies, name: string){
        const { playerRepository } = dependencies;
        const symbol = getSymbol();
        const response = await playerRepository.create(name,symbol);
        return response;
    }
}

const getSymbol = () => {
    return true;
}
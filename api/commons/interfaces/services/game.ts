import { GameControllerDependencies } from '../../../controllers/init_game';

export interface IGameService{
    create(dependencies: GameControllerDependencies["repositories"], playerName: string): Promise<any>; 
}
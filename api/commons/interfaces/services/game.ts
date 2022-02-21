import { GameControllerDependencies } from '../../../controllers/init_game';
import { IPlayerResponse } from '../repositories/player';
import { IGameResponse } from '../repositories/game';
export interface IGameService{
    create( deps: GameControllerDependencies["repositories"], player: IPlayerResponse): Promise<IGameResponse>; 
    init( deps: GameControllerDependencies["repositories"], hash: string, playerId: string): Promise<any>;
    join( deps: GameControllerDependencies["repositories"], hash: string, playerId:string): Promise<any>;
    updateBoard(deps: GameControllerDependencies["repositories"], hash: string, cellPosition: number, playerId: string, playerSymbol: string): Promise<any>
    getBoardStatus( deps: GameControllerDependencies["repositories"], hash: string): Promise<any>
}
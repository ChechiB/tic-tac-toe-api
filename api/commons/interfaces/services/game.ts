import { GameControllerDependencies } from '../../../controllers/init_game';
export interface IGameResponse {
    hash: string
}
export interface IGameService{
    create( deps: GameControllerDependencies["repositories"], playerName: string): Promise<IGameResponse>; 
    init( deps: GameControllerDependencies["repositories"], hash: string, playerId: string): Promise<any>;
    join( deps: GameControllerDependencies["repositories"], hash: string, playerId:string): Promise<any>;
    updateBoard(deps: GameControllerDependencies["repositories"], hash: string, cellPosition: string, playerId: string, playerSymbol: string): Promise<any>
    getBoardStatus( deps: GameControllerDependencies["repositories"], hash: string): Promise<any>
}
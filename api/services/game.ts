import { generateHash } from '../commons/utils/hash';
import { IGameService } from '../commons/interfaces/services/game';
import { IBoard } from '../commons/interfaces/board';
import CustomError from '../commons/custom_error';
import { IGameResponse } from 'api/commons/interfaces/repositories/game';

const statusAllowed = {
    TIE: "tie",
    WINNER: "winner",
    PLAYING: "playing"
};

export const gameService: IGameService = {
    async create( deps, player): Promise<IGameResponse>{
        const { gameRepository }= deps;
        const hash = generateHash(player.playerName);          
        console.log("PLAYER BACK", player)
        const board = initBoard();
        
        const data = {
            hash,
            board,
            players: {
                playerOneId: player.id,
                playerTwoId: null,
                nextPlayer: null,
            },
            status: false
        };
        console.log("To create", data);
        
        const game = await gameRepository.create(data);
        return game;
    },

    // Si el juego no existe -> error
    async init(deps, hash, playerId) {
        const { gameRepository } = deps;

        const board = initBoard();
        
        const data = {
            board,
            players: {
                playerOneId: playerId
            }
        };
        
        const response = await gameRepository.update(hash,data);

        return response;
    },

    // actualizar el satus si algun jugador cierra la pestaña -> se cancela el juego
    // validar si el hash existe y validar estado del juego en middleware
    async join(deps, hash, playerId){
        const { gameRepository } = deps;
        const { players } = await gameRepository.get(hash);

        if(!players){
            throw new CustomError(400, "Two players already");
        }

        const nextPlayer = getNextPlayer(players, players.nextPlayer);
        const data = {
            players: {
                playerTwoId: playerId,
                nextPlayer
            }
        };
        const response = await gameRepository.update(hash, data);
        return response;
    },

    // check cell
    async updateBoard(deps, hash, cellPosition, playerSymbol, playerId){
        const { gameRepository } = deps;
        const { board, players } = await gameRepository.get(hash);

        const boardResponse = {...board};
        const playersResponse = {...players};

        if(boardResponse[`cell${cellPosition}`] !==""){
            throw new CustomError(400, "Cell already occupied");
        }

        boardResponse[`cell${cellPosition}`] = playerSymbol;
        const nextPlayer = getNextPlayer(playersResponse, playerId);
        playersResponse.nextPlayer = nextPlayer;
        return await gameRepository.update(hash, {board, players: playersResponse});        
    },
    
    // cambiar nombre por gameStatus
    async getBoardStatus(deps, hash){    
        const { gameRepository } = deps;
        const response = await gameRepository.get(hash);
        
        const isGameInit = response?.board;

        if (!isGameInit){
            return response;
        }

        const statusType = checkWinner(formatCells(response.board)); 
        const status = statusType !== statusAllowed.PLAYING ? false : true ;

        //set status
        const game = await gameRepository.update(hash, {status});
        return {
            game,
            statusType
        }
    }
}

const initBoard = (): IBoard=> {
    return {
        cell0: null,
        cell1: null,
        cell2: null,
        cell3: null,
        cell4: null,
        cell5: null,
        cell6: null,
        cell7: null,
        cell8: null
    }
}

const formatCells = (board) => {
    const size = 3; 
    const cells = [];
    for (let i=0; i<board.length; i=i+size) {
        cells.push(board.slice(i,i+size));
    }
    return cells;
}

const getNextPlayer = (players,actualPlayer): string => {
    if (!actualPlayer){ //validate
       const nextPlayer = Math.random() <0.5 ? players.playerOne.id : players.playerTwo.id;
        return nextPlayer;
    }

    const nextPlayer = actualPlayer === players.playerOne.id ? players.playerTwo.id: players.playerOne.id
    return nextPlayer;
}

const checkWinner = (cells): string =>{
    const verticalLines = determineVerticalLines(cells);
    const crossLines = determineCrooslines(cells);
    
    //To check tie
    const emptyMatrix = containsEmptyCell(cells);
    
    const coincidences= checkCoincidence(cells)||checkCoincidence(verticalLines)||checkCoincidence(crossLines);

    if (!coincidences && !emptyMatrix ) {
        return statusAllowed.TIE;
    }

    if(coincidences === true){
        return statusAllowed.WINNER;
    }
    
    return statusAllowed.PLAYING;
}


const checkCoincidence = (cells): boolean =>{
    for (let i = 0; i < cells.length; i++) {
        if (checkHorizontalLine(cells[i])){
            return true;
        }        
    }
    return false;
}

const checkHorizontalLine = (horizontalLine): boolean =>{   
    if(horizontalLine[0] == ""){
        return false;
    } 

    for (let i = 1; i < horizontalLine.length; i++) {
        if(horizontalLine[0]!== horizontalLine[i]){
            return false;
        }       
    }      
    return true;
}

const containsEmptyCell = (cells): boolean =>{
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if(cells[i][j] ===""){
                return true;
            }            
        }        
    }   
    return false; 
}

const determineVerticalLines = (cells)=>{
    const verticalLinesBoard = []
    for (let i = 0; i < cells.length; i++) {
        const determineVerticalLine = []
        for (let j = 0; j < cells[i].length; j++) {
            determineVerticalLine.push(cells[j][i])
        }
        verticalLinesBoard.push(determineVerticalLine)
    }
    return verticalLinesBoard;
}

const determineCrooslines = (cells) =>{
    const principalD = []
    const secondaryD = []

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if(i === j){
                principalD.push(cells[i][j]);
            }
            if(i+j === cells.length-1){
                secondaryD.push(cells[i][j]);
            }            
        }        
    }

    return [principalD,secondaryD];
}

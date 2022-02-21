import { generateHash } from '../commons/utils/hash';
import { IGameService } from '../commons/interfaces/services/game';
import { IBoard } from '../commons/interfaces/board';
import CustomError from '../commons/custom_error';
import { IGameResponse } from 'api/commons/interfaces/repositories/game';
import { ObjectId } from 'mongodb';

const statusAllowed = {
    TIE: "tie",
    WINNER: "winner",
    PLAYING: "playing"
};

export const gameService: IGameService = {
    async create( deps, player): Promise<IGameResponse>{
        const { gameRepository }= deps;
        const hash = generateHash(player.playerName);          
        const board = initBoard();
        
        const data = {
            hash,
            board,
            players: {
                playerOneId: player.id.toString(),
                playerTwoId: null,
                nextPlayer: null,
            },
            status: false
        };        
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

    async join(deps, hash, playerId){
        const { gameRepository } = deps;
        const { players } = await gameRepository.get(hash);

        if(players.playerTwoId){
            throw new CustomError(400, "Two players already", "C06");
        }
        const playersIds = {
            playerOneId: players.playerOneId.toString(),
            playerTwoId: playerId
        }

        const nextPlayer = getNextPlayer(playersIds, players.nextPlayer);
        const data = {
            players: {
                ...playersIds,
                nextPlayer
            }
        };
        
        const game = await gameRepository.update(hash, data);
        
        return {
            players: game.players,
            id: game.id,
            hash: game.hash,
            status: game.status,
            board: game.board,
        };
    },

    // update cell
    async updateBoard(deps, hash, cellPosition, playerId,playerSymbol){        
        const { gameRepository } = deps;
        const { board, players } = await gameRepository.get(hash);
        
        const boardResponse = {
                cell0: board.cell0,
                cell1: board.cell1,
                cell2: board.cell2,
                cell3: board.cell3,
                cell4: board.cell4,
                cell5: board.cell5,
                cell6: board.cell6,
                cell7: board.cell7,
                cell8: board.cell8
        };
        const playersResponse = {
            playerOneId: players.playerOneId.toString(),
            playerTwoId: players.playerTwoId.toString(),
            nextPlayer:players.nextPlayer
        };

        if(boardResponse[`cell${cellPosition}`] !== null){
            throw new CustomError(400, "Cell already occupied", "C05");
        }

        boardResponse[`cell${cellPosition}`] = playerSymbol;
        const nextPlayer = getNextPlayer(playersResponse, playerId);        
        playersResponse.nextPlayer = nextPlayer;
        const game =  await gameRepository.update(hash, {board: boardResponse, players: playersResponse});        
        
        return {
            players: game.players,
            id: game.id,
            hash: game.hash,
            status: game.status,
            board: game.board,
        }
    },
    
    // cambiar nombre por gameStatus
    async getBoardStatus(deps, hash){    
        const { gameRepository } = deps;
        const response = await gameRepository.get(hash);
        
        if (!response.board){
            return response; // throw error 
        }

        const boardResponse = {
            cell0: response.board.cell0,
            cell1: response.board.cell1,
            cell2: response.board.cell2,
            cell3: response.board.cell3,
            cell4: response.board.cell4,
            cell5: response.board.cell5,
            cell6: response.board.cell6,
            cell7: response.board.cell7,
            cell8: response.board.cell8
        };

        const statusType = checkWinner(formatCells(boardResponse)); 
        const status = statusType !== statusAllowed.PLAYING ? false : true ;

        //set status
        const game = await gameRepository.update(hash, {status});
        return {
            players: game.players,
            id: game.id,
            hash: game.hash,
            status: game.status,
            board: game.board,
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
    const boardArray = Object.values(board);
    for (let i=0; i<boardArray.length; i=i+size) {
        const test = boardArray.slice(i,i+size);        
        cells.push(test);
    }
    return cells;
}

const getNextPlayer = (players,actualPlayer): string => {    
    if (!actualPlayer){
       const nextPlayer = Math.random() <0.5 ? players.playerOneId : players.playerTwoId;
        return nextPlayer;
    }

    const nextPlayer = actualPlayer === players.playerOneId ? players.playerTwoId: players.playerOneId
    return nextPlayer;
}

const checkWinner = (cells): string =>{
    const verticalLines = determineVerticalLines(cells);    
    const crossLines = determineCrooslines(cells);
    //To check tie
    const emptyCells = containsEmptyCell(cells);
    
    // horizontal - vertical- cross
    const coincidences= checkCoincidence(cells)||checkCoincidence(verticalLines)||checkCoincidence(crossLines);

    if (!coincidences && !emptyCells ) {
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
    if(horizontalLine[0] === null){
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
            if(!cells[i][j]){
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

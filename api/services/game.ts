import { generateHash } from '../commons/utils/hash';
import { IGameResponse, IGameService } from '../commons/interfaces/services/game';
import { IBoard } from '../commons/interfaces/board';
import CustomError from '../commons/custom_error';

const statusAllowed = {
    TIE: "tie",
    WINNER: "winner",
    PLAYING: "playing"
};

export const gameService: IGameService = {
    async create( deps, playerName): Promise<IGameResponse>{
        const { gameRepository }= deps;
        const hash = generateHash(playerName);                
        const game = await gameRepository.create(hash);
        // ver si es necesario devolver el playerID
        return {
            hash: game.hash,
        };
    },

    // el front va a crear el player
    // en un middleware validar si el player existe
    // en otro lado validar cuando se une un user si ya existe primero, dps validar aca si ya hay 2 jugadores unidos a la partida
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
    // podria traer el jeugo en un middleware y propagar
    async join(deps, hash, playerId){
        const { gameRepository } = deps;
        const { players } = await gameRepository.get(hash);
        const nextPlayer = getNextPlayer(players, players.nextPlayer);
        const data = {
            players: {
                playerTwoId: playerId,
                nextPlayer
            },

        };
        const response = await gameRepository.update(hash, data);
        return response;
    },

    // checkear casilla
    async updateBoard(deps, hash, cellPosition, playerSymbol, playerId){
        const { gameRepository } = deps;
        const { board, players } = await gameRepository.get(hash);

        if(board[`cell${cellPosition}`] !==""){
            //mejorar
            throw new CustomError(400, "Cell already occupied");
        }

        board[`cell${cellPosition}`] = playerSymbol;
        const nextPlayer = getNextPlayer(players, playerId);


        const resp = await gameRepository.update(hash, board);
        return {};        
    },
    
    async getBoardStatus(deps, hash){
        const { gameRepository } = deps;
        const { board } = await gameRepository.get(hash);
        const statusType = checkWinner(formatCells(board)); 
        const status = statusType !== statusAllowed.PLAYING ? false : true ;

        //set status
        await gameRepository.update(hash, status);
        return {
            statusType: "slada"
        }
    }
}

//modificar
const initBoard = (): IBoard=> {
    return {
        cell0: "",
        cell1: "",
        cell2: "",
        cell3: "",
        cell4: "",
        cell5: "",
        cell6: "",
        cell7: "",
        cell8: ""
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
    if ( actualPlayer === ""){ // ver si mongo puede guardar null
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

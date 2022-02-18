import { IGameRepository } from '../commons/interfaces/repositories/game';
import Game from '../models/game';

export const gameRepository: IGameRepository = {
    async create(hash: string){
        const body = {
            hash,
            status: false,
            nextPlayer: null
        }
    
        const game = new Game(body);
        const bla= game.save();
        const test  = {
            id: "string",
            hash: "string",
            status: true,
            board: ["hola"],
            players: {
                playerOneId: "string",
                playerTwoId: "string",
                nextPlayer: "string",
            }
        }
        return test;
    },

    async update(hash,data){
        const bla = Game.findOneAndUpdate({hash},data,
            {
            useFindAndModify: false,
            'new': true,
            upsert: true
        });
        return {
            id: "string",
            hash: "string",
            status: true,
            board: [],
            players: {
                playerOneId: "string",
                playerTwoId: "string",
                nextPlayer: "string",
            }
        }
    },

    async get(hash){
        const bla = Game.findOne({hash});
        return {
            id: "string",
            hash: "string",
            status: true,
            board: [],
            players: {
                playerOneId: "string",
                playerTwoId: "string",
                nextPlayer: "string",
            }
        }
    }
}
import mongoose from 'mongoose';
// const moment = require('moment');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    cell0: { type: String, default: null},
    cell1: { type: String, default: null},
    cell2: { type: String, default: null},
    cell3: { type: String, default: null},
    cell4: { type: String, default: null},
    cell5: { type: String, default: null},
    cell6: { type: String, default: null},
    cell7: { type: String, default: null},
    cell8: { type: String, default: null},
},  { _id : false })

const gameSchema = new Schema({
    hash: { type: String, required: true },
    status: { type: String, required: true, default: null },
    players: {
        playerOneId: { type: Schema.Types.ObjectId,  required: false, default: null },
        playerTwoId: { type: Schema.Types.ObjectId, required: false, default: null },
        nextPlayer: { type: String, required: false, default: null },
    },
    board: { type: boardSchema, required: false }
});

gameSchema.index({ 'hash': 1 }, { unique: true });

export = mongoose.model('Game', gameSchema);

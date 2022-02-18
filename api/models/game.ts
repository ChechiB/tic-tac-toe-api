import mongoose from 'mongoose';
// const moment = require('moment');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    hash: { type: String, required: true },
    status: { type: String, required: false },
    players: {
        playerOneId: { type: Schema.Types.ObjectId,  required: false },
        playerTwoId: { type: Schema.Types.ObjectId, required: false },
        nextPlayer: { type: String, required: false },
    },
    board: { type: [String], required: true }
});

gameSchema.index({ 'hash': 1 }, { unique: true });

export = mongoose.model('Game', gameSchema);

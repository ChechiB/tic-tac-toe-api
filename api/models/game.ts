import mongoose from 'mongoose';
// const moment = require('moment');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    hash: { type: String, required: true },
    status: { type: String, required: true },
    nextPlayer: { type: String, required: false },
    createdAt: { type: Date, 'default': Date.now },
    modifiedAt: { type: Date, 'default': Date.now },
});

gameSchema.index({ 'hash': 1 }, { unique: true });

export = mongoose.model('Game', gameSchema);

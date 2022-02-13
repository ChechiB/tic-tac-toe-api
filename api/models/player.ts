import mongoose from 'mongoose';
// const moment = require('moment');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    symbol: { type: Boolean, required: false },
    name: { type: String, required: true },
    createdAt: { type: Date, 'default': Date.now },
    modifiedAt: { type: Date, 'default': Date.now },
});

export = mongoose.model('Player', playerSchema);

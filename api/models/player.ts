import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    symbol: { type: String, required: false, default: null},
    name: { type: String, required: true }
});

export = mongoose.model('Player', playerSchema);

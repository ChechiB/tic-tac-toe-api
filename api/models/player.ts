import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    symbol: { type: String, required: false },
    name: { type: String, required: true }
});

export = mongoose.model('Player', playerSchema);

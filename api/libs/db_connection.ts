import mongoose from 'mongoose';


export async function connect(cfg) {
    const dbCfg = cfg.get('db');
    const { connString, dbName } = dbCfg;
    const { autoIndex } = dbCfg.options;
    await mongoose.connect(connString, {
        dbName,
        autoIndex
    });
}

export function getMongoTypes(){
    return {
        types: mongoose.Types
    }
}
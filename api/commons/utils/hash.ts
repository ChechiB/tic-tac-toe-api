// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import * as CryptoJS from "crypto-js";

export const generateHash = (playerName) => {
    const hash = CryptoJS.AES.encrypt(playerName, process.env.HASH_KEY).toString();   
    return hash.replace(/\+/g,'').replace(/\//g,'').replace(/=/g,'');
}
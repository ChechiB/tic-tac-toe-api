import * as CryptoJS from "crypto-js";

export const generateHash = (playerName) => {
    return CryptoJS.AES.encrypt(playerName, process.env.HASH_KEYs).toString();
}
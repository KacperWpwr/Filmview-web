const CryptoJS = require('crypto-js');
const passphrase = 'HF478GY48GFG2FHU28EF74HF28EH0F28UFH487FH48F7H4O8FH';
export const encrypt = (text) => {

    return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};
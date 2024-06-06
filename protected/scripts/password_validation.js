import { statiCrypt } from "/scripts/staticrypt.js" 
const SALT = "7e7610a1628c19f6d53bfbaee6f92f59"

pass = localStorage.password;

function decryption(content) {
    result = exports.decode(content, pass, SALT)
    if (result.success) return result.decoded;
    else window.location.replace('/');
}


statiCrypt = document.createElement("script");
statiCrypt.href = "/scripts/staticrypt.js" 
document.head.appendChild(statiCrypt);
const SALT = "7e7610a1628c19f6d53bfbaee6f92f59"

pass = localStorage.password;

export async function decryption(content) {
    result = exports.decode(content, pass, SALT)
    if (!result.success) window.location.replace('/');
    else {
        return result.decoded;
    }
}
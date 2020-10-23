const EC = require("elliptic").ec;
const ec = new EC("secp256k1"); 

const chaves = ec.genKeyPair();
const chavePublica = chaves.getPublic("hex");
const chavePrivada = chaves.getPrivate("hex");

console.log();
console.log("Chave Privada:",chavePrivada);

console.log();
console.log("Chave Pública:",chavePublica);

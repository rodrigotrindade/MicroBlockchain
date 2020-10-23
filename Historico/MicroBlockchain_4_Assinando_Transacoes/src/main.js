const {MicroBlockchain,Transacao} = require("./microblockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1"); 

const minhaChave = ec.keyFromPrivate("445703189358ff0585533fca4b9be2ed435847aec093ceb3458794c022850514");
const enderecoCarteira = minhaChave.getPublic("hex");

const tcc = new MicroBlockchain();

const t1 = new Transacao(enderecoCarteira,"chave publica vai aqui",10);
t1.assinarTransacao(minhaChave);
tcc.incluirTransacao(t1);
 
console.log("\n Iniciando mineração...");
tcc.minerarTransacoesPendentes(enderecoCarteira); 

console.log("\n O balanço de Rodrigo é:",tcc.buscarBalancoCarteira(enderecoCarteira)); 
console.log("\nA cadeia é válida?",tcc.cadeiaValida());

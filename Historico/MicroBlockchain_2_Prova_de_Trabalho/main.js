const SHA256 = require('crypto-js/sha256');

class Bloco{
	constructor(indice,timestamp,dados,hashAnterior=""){
		this.indice = indice;
		this.timestamp = timestamp;
		this.dados = dados;
		this.hashAnterior = hashAnterior;
		this.hash = this.calcularHash();
		this.nonce = 0;
	}

	calcularHash(){
		return SHA256(this.indice+this.hashAnterior+this.timestamp+JSON.stringify(this.dados)+this.nonce).toString();
	}

	minerarBloco(dificuldade){
		while(this.buscarHash().substring(0,dificuldade) !== Array(dificuldade+1).join("0")){
			this.nonce++;
			this.definirHash(this.calcularHash());
		}

		console.log("Bloco minerado: "+this.buscarHash());
	}

	buscarHash(){
		return this.hash;
	}

	buscarHashAnterior(){
		return this.hashAnterior;
	}

	definirHash(hash){
		this.hash = hash;
	}

	definirHashAnterior(hashAnterior){
		this.hashAnterior = hashAnterior;
	}
}

class MicroBlockchain{
	constructor(){
		this.cadeia = [this.criarBlocoGenesis()];
		this.dificuldade = 2;
	}

	criarBlocoGenesis(){
		return new Bloco(0,"22/09/2020","Bloco Genesis","0");
	}

	buscarUltimoBloco(){
		return this.cadeia[this.cadeia.length-1];
	}

	criarBloco(novoBloco){
		novoBloco.definirHashAnterior(this.buscarUltimoBloco().buscarHash());
		novoBloco.minerarBloco(this.dificuldade);
		this.cadeia.push(novoBloco); 
	}

	cadeiaValida(){
		for(let i=1;i<this.cadeia.length;i++){
			const blocoAtual = this.cadeia[i];
			const blocoAnterior = this.cadeia[i-1];

			if(blocoAtual.buscarHash() !== blocoAtual.calcularHash())
				return false;

			if(blocoAtual.buscarHashAnterior() !== blocoAnterior.buscarHash())
				return false;
		}

		return true;
	}
}

let tcc = new MicroBlockchain();
console.log("Minerando bloco 1...");
tcc.criarBloco(new Bloco(1,"23/09/2020",{ valor: 4 }));
console.log("Minerando bloco 2...");
tcc.criarBloco(new Bloco(2,"24/09/2020",{ valor: 10 }));
 
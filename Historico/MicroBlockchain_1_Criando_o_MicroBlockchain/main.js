const SHA256 = require('crypto-js/sha256');

class Bloco{
	constructor(indice,timestamp,dados,hashAnterior=""){
		this.indice = indice;
		this.timestamp = timestamp;
		this.dados = dados;
		this.hashAnterior = hashAnterior;
		this.hash = this.calcularHash();
	}

	calcularHash(){
		return SHA256(this.indice+this.hashAnterior+this.timestamp+JSON.stringify(this.dados)).toString();
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
	}

	criarBlocoGenesis(){
		return new Bloco(0,"22/09/2020","Bloco Genesis","0");
	}

	buscarUltimoBloco(){
		return this.cadeia[this.cadeia.length-1];
	}

	criarBloco(novoBloco){
		novoBloco.definirHashAnterior(this.buscarUltimoBloco().buscarHash());
		novoBloco.definirHash(novoBloco.calcularHash());
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
tcc.criarBloco(new Bloco(1,"23/09/2020",{ valor: 4 }));
tcc.criarBloco(new Bloco(2,"24/09/2020",{ valor: 10 }));

console.log("O MicroBlockchain é valido? "+tcc.cadeiaValida());

tcc.cadeia[1].dados = { valor: 100 };
tcc.cadeia[1].definirHash(tcc.cadeia[1].calcularHash());

console.log("O MicroBlockchain é valido? "+tcc.cadeiaValida());

// console.log(JSON.stringify(tcc,null,4));
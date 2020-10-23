const SHA256 = require('crypto-js/sha256');

class Transacao{
	constructor(origem,destino,quantia){
		this.origem = origem;
		this.destino = destino;
		this.quantia = quantia;
	}
}

class Bloco{
	constructor(timestamp,transacoes,hashAnterior=""){
		this.timestamp = timestamp;
		this.transacoes = transacoes;
		this.hashAnterior = hashAnterior;
		this.hash = this.calcularHash();
		this.nonce = 0;
	}

	calcularHash(){
		return SHA256(this.hashAnterior+this.timestamp+JSON.stringify(this.dados)+this.nonce).toString();
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
		this.transacoesPendentes = [];
		this.recompensaMineracao = 100;
	}

	criarBlocoGenesis(){
		return new Bloco("22/09/2020","Bloco Genesis","0");
	}

	buscarUltimoBloco(){
		return this.cadeia[this.cadeia.length-1];
	}

	minerarTransacoesPendentes(carteiraRecompensaMineracao){
		const  recompensaTransacao = new Transacao(null,carteiraRecompensaMineracao,this.recompensaMineracao);
		this.transacoesPendentes.push(recompensaTransacao);
		
		let bloco = new Bloco(Date.now(),this.transacoesPendentes);
		bloco.minerarBloco(this.dificuldade);

		console.log("Bloco minerado com sucesso!");
		this.cadeia.push(bloco);

		this.transacoesPendentes = [
			new Transacao(null,carteiraRecompensaMineracao,this.recompensaMineracao)
		]; 
	}

	criarTransacao(transacao){
		this.transacoesPendentes.push(transacao);
	}

	buscarBalancoCarteira(carteira){
		let balanco = 0;

		for(const bloco of this.cadeia){
			for(const transacao of bloco.transacoes){
				if(transacao.origem === carteira)
					balanco -= transacao.quantia;

				if(transacao.destino === carteira)
					balanco += transacao.quantia;
			}
		}

		return balanco;
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
tcc.criarTransacao(new Transacao("carteira1","carteira2",100));
tcc.criarTransacao(new Transacao("carteira2","carteira1",50));

console.log("\n Iniciando mineração...");
tcc.minerarTransacoesPendentes("carteira-rodrigo"); 

console.log("\n O balanço de Rodrigo é:",tcc.buscarBalancoCarteira('carteira-rodrigo')); 

// console.log("\n Iniciando mineração novamente...");
// tcc.minerarTransacoesPendentes("carteira-rodrigo"); 

// console.log("\n O balanço de Rodrigo é:",tcc.buscarBalancoCarteira('carteira-rodrigo')); 

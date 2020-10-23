const SHA256 = require('crypto-js/sha256');
const EC = require("elliptic").ec;
const ec = new EC("secp256k1"); 

class Transacao{
	constructor(origem,destino,quantia){
		this.origem = origem;
		this.destino = destino;
		this.quantia = quantia;
	}

	calcularHash(){
		return SHA256(this.origem+this.destino+this.quantia).toString();
	}

	assinarTransacao(chaveAssinante){
		if(chaveAssinante.getPublic("hex") !== this.origem)
			throw new Error("Você não pode assinar transações de outras carteiras!"); 

		const hashTransacao = this.calcularHash();
		const assina = chaveAssinante.sign(hashTransacao,"base64");
		this.assinatura = assina.toDER("hex");
	}

	valida(){
		if(this.origem === null) return true;

		if(!this.assinatura || this.assinatura.length === 0)
			throw new Error("Esta transação não está assinada!");

		const chavePublica = ec.keyFromPublic(this.origem,"hex"); 
		return chavePublica.verify(this.calcularHash(),this.assinatura);
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

	transacoesValidas(){
		for(const transacao of this.transacoes)
			if(!transacao.valida())
				return false;

		return true;
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
		const recompensaTransacao = new Transacao(null,carteiraRecompensaMineracao,this.recompensaMineracao);
		this.transacoesPendentes.push(recompensaTransacao);

		let bloco = new Bloco(Date.now(),this.transacoesPendentes,this.buscarUltimoBloco().hash);
		bloco.minerarBloco(this.dificuldade);

		console.log("Bloco minerado com sucesso!");
		this.cadeia.push(bloco);

		this.transacoesPendentes = [
			new Transacao(null,carteiraRecompensaMineracao,this.recompensaMineracao)
		]; 
	}

	incluirTransacao(transacao){
		if(!transacao.origem || !transacao.destino)
			throw new Error("A transação precisa ter uma carteira de origem e outra de destino!");

		if(!transacao.valida())
			throw new Error("A transação é inválida e não será incluída na cadeia!");

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

			if(!blocoAtual.transacoesValidas())
				return false;

			if(blocoAtual.buscarHash() !== blocoAtual.calcularHash())
				return false;

			if(blocoAtual.buscarHashAnterior() !== blocoAnterior.buscarHash())
				return false;
		}

		return true;
	}
}

module.exports.MicroBlockchain = MicroBlockchain;
module.exports.Transacao = Transacao; 
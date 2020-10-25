const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transacao {
  /**
   * @param {string} origem
   * @param {string} destino
   * @param {number} quantia
   */
  constructor(origem, destino, quantia) {
    this.origem = origem;
    this.destino = destino;
    this.quantia = quantia;
    this.timestamp = Date.now();
  }

  /**
   * Cria um hash SHA256 a partir da transação
   *
   * @returns {string}
   */
  calcularHash() {
    return SHA256(this.origem + this.destino + this.quantia + this.timestamp)
      .toString();
  }

  /**
   * Assina uma transação com a chaveAssinante fornecida (que é um par de chaves elíptico
   * objeto que contém uma chave privada). A assinatura é então armazenada dentro do
   * objeto de Transacao e posteriormente armazenado no MicroBlockchain.
   *
   * @param {string} chaveAssinante
   */
  assinarTransacao(chaveAssinante) {
	// Você só pode enviar uma transação cuja carteira corresponda à sua
    // chave. Portanto, aqui verificamos se a origem corresponde à sua chave pública
    if (chaveAssinante.getPublic('hex') !== this.origem) {
      throw new Error("Você não pode assinar transações de outras carteiras!");
    }

    
	// Calcula o hash da transação, assina com a chave
    // e o armazena dentro do objeto Transacao
    const hashTransacao = this.calcularHash();
    const assina = chaveAssinante.sign(hashTransacao, 'base64');
    this.assinatura = assina.toDER('hex');
  }

  /**
   * Verifica se a assinatura é válida (se a transação não foi adulterada).
   * Ele usa a origem como chave pública.
   *
   * @returns {boolean}
   */
  valida() {
	// Se a transação não tiver uma carteira de origem, assumimos que é uma
    // recompensa de mineração e que é válida.
    if (this.origem === null) return true;
    if (!this.assinatura || this.assinatura.length === 0) {
      throw new Error("Esta transação não está assinada!");
    }

    const chavePublica = ec.keyFromPublic(this.origem, 'hex');
    return chavePublica.verify(this.calcularHash(), this.assinatura);
  }
}

class Bloco {
  /**
   * @param {number} timestamp
   * @param {Transacao[]} transacoes
   * @param {string} hashAnterior
   */
  constructor(timestamp, transacoes, hashAnterior = '') {
    this.hashAnterior = hashAnterior;
    this.timestamp = timestamp;
    this.transacoes = transacoes;
    this.nonce = 0;
    this.hash = this.calcularHash();
  }

  /**
   * Retorna o SHA256 deste bloco (processando todos os seus dados armazenados)
   *
   * @returns {string}
   */
  calcularHash() {
    return SHA256(this.hashAnterior + this.timestamp + JSON.stringify(this.transacoes) + this.nonce).toString();
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

  /**
   * Inicia o processo de mineração no bloco. Ele muda o 'nonce' até que o hash
   * do bloco inicie com zeros suficientes (= dificuldade)
   *
   * @param {number} dificuldade
   */
  minerarBloco(dificuldade) {
    while (this.buscarHash().substring(0, dificuldade) !== Array(dificuldade + 1).join('0')) {
      this.nonce++;
      this.definirHash(this.calcularHash());
    }

    console.log(`Bloco Minerado: ${this.buscarHash()}`);
  }

  /**
   * Valida todas as transações dentro do bloco (assinatura + hash) e
   * retorna verdadeiro se tudo estiver correto. False se o bloco for inválido.
   *
   * @returns {boolean}
   */
  transacoesValidas() {
    for (const transacao of this.transacoes) {
      if (!transacao.valida()) {
        return false;
      }
    }

    return true;
  }
}

class MicroBlockchain {
  constructor() {
    this.cadeia = [this.criarBlocoGenesis()];
    this.dificuldade = 2;
    this.transacoesPendentes= [];
    this.recompensaMineracao = 100;
  }

  /**
   * @returns {Bloco}
   */
  criarBlocoGenesis() {
    return new Bloco(Date.parse('2020-10-01'), [], '0');
  }

  /**
   * Retorna o bloco mais recente da cadeia. Útil quando se deseja criar um
   * novo Bloco e se precisa do hash do Bloco anterior.
   *
   * @returns {Bloco[]}
   */
  buscarUltimoBloco(){
    return this.cadeia[this.cadeia.length - 1];
  }

  /**
   * Todas as transações pendentes são colocadas num bloco e o
   * processo de mineração é iniciado. Uma transação adicional é colocada para enviar a recompensa de mineração para a 
   * carteira informada.
   *
   * @param {string} carteiraRecompensaMineracao
   */
  minerarTransacoesPendentes(carteiraRecompensaMineracao) {
    const recompensaTransacao = new Transacao(null, carteiraRecompensaMineracao, this.recompensaMineracao);
    this.transacoesPendentes.push(recompensaTransacao);

    let bloco = new Bloco(Date.now(), this.transacoesPendentes, this.buscarUltimoBloco().hash);
    bloco.minerarBloco(this.dificuldade);

    console.log('Bloco minerado com sucesso!');
    this.cadeia.push(bloco);

    this.transacoesPendentes= [];
  }

  /**
   * Inclui uma nova transação à lista de transações pendentes (para a próxima
   * vez que o processo de mineração começar). Isso verifica se a transação
   * está devidamente assinada.
   *
   * @param {Transacao} transacao
   */
  incluirTransacao(transacao) {
    if (!transacao.origem || !transacao.destino) {
      throw new Error('A transação precisa ter uma carteira de origem e outra de destino!');
    }

    // Verifica a transação
    if (!transacao.valida()) {
      throw new Error('A transação é inválida e não será incluída na cadeia!');
    }
    
    if (transacao.quantia <= 0) {
      throw new Error('A quantia envolvida na transação tem que ser maior que zero!');
    }

    this.transacoesPendentes.push(transacao);
  }

  /**
   * Retorna o saldo de uma carteira.
   *
   * @param {string} carteira
   * @returns {number} O saldo da carteira
   */
  buscarBalancoCarteira(carteira) {
    let balanco = 0;

    for (const bloco of this.cadeia) {
      for (const transacao of bloco.transacoes) {
        if (transacao.origem === carteira) {
          balanco -= transacao.quantia;
        }

        if (transacao.destino === carteira) {
          balanco += transacao.quantia;
        }
      }
    }

    return balanco;
  }

  /**
   * Retorna a lista de transações que ocorreram
   * na carteira fornecida.
   *
   * @param  {string} carteira
   * @return {Transacao[]}
   */
  buscarTransacoesCarteira(carteira) {
    const txs = [];

    for (const bloco of this.cadeia) {
      for (const tx of bloco.transacoes) {
        if (tx.origem === carteira || tx.destino === carteira) {
          txs.push(tx);
        }
      }
    }

    return txs;
  }

  /**
   * Um loop é realizado nos blocos da cadeia e verificando se eles estão corretamente
   * conectados entre si e se não houve alteração nos hashes. A partir da verificação
   * dos blocos, as respectivas transações (assinadas) também são verificadas.
   *
   * @returns {boolean}
   */
  cadeiaValida() {
    // Verifica se o bloco Genesis não foi adulterado, comparando
    // a saída do método criarBlocoGenesis() com o primeiro bloco da cadeia
    const genesis = JSON.stringify(this.criarBlocoGenesis());

    if (genesis !== JSON.stringify(this.cadeia[0])) {
      return false;
    }

    // Verifica os blocos restantes da cadeia, conferindo se os hashes e
    // assinaturas estão corretos
    for (let i = 1; i < this.cadeia.length; i++) {
      const blocoAtual = this.cadeia[i];

      if (!blocoAtual.transacoesValidas()) {
        return false;
      }

      if (blocoAtual.buscarHash() !== blocoAtual.calcularHash()) {
        return false;
      }
    }

    return true;
  }
}

module.exports.MicroBlockchain = MicroBlockchain;
module.exports.Bloco = Bloco;
module.exports.Transacao = Transacao;

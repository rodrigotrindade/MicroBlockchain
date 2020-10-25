import { Injectable } from '@angular/core';
import { MicroBlockchain } from 'micro-blockchain/Servico/src/microblockchain';
import EC from 'elliptic'

@Injectable({
  providedIn: 'root'
})
export class MicroblockchainService {

  public microblockchainInstance = new MicroBlockchain();
  public chavesCarteira = [];

  constructor() { 
    this.microblockchainInstance.dificuldade = 1;
    this.microblockchainInstance.minerarTransacoesPendentes("carteira-do-rodrigo");
    this.gerarChavesCarteira();
  }

  buscarBlocos(){
    return this.microblockchainInstance.cadeia;
  }

  incluirTransacao(tx){
    this.microblockchainInstance.incluirTransacao(tx);
  }

  buscarTransacoesPendentes(){
    return this.microblockchainInstance.transacoesPendentes;
  }

  minerarTransacoesPendentes(){
    this.microblockchainInstance.minerarTransacoesPendentes(
      this.chavesCarteira[0].chavePublica
    );
  }

  private gerarChavesCarteira(){
    const ec = new EC.ec("secp256k1");
    const chaves = ec.genKeyPair();

    this.chavesCarteira.push({
      chavesObj: chaves,
      chavePublica: chaves.getPublic("hex"),
      chavePrivada: chaves.getPrivate("hex")
    });
  }
}

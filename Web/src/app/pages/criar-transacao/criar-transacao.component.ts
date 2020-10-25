import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MicroblockchainService } from 'src/app/services/microblockchain.service';
import { Transacao } from 'micro-blockchain/Servico/src/microblockchain';

@Component({
  selector: 'app-criar-transacao',
  templateUrl: './criar-transacao.component.html',
  styleUrls: ['./criar-transacao.component.scss']
})
export class CriarTransacaoComponent implements OnInit {

  public novaTx;
  public chavesCarteira;

  constructor(private microblockchainService:MicroblockchainService) { 
    this.chavesCarteira = microblockchainService.chavesCarteira[0];
  }

  ngOnInit(): void {
    this.novaTx = new Transacao();
  }

  criarTransacao(){
    this.novaTx.origem = this.chavesCarteira.chavePublica;
    this.novaTx.assinarTransacao(this.chavesCarteira.chavesObj);

    this.microblockchainService.incluirTransacao(this.novaTx);

    this.novaTx = new Transacao();
  }
}

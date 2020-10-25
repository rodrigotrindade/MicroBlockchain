import { Component, OnInit } from '@angular/core';
import { MicroblockchainService } from 'src/app/services/microblockchain.service';

@Component({
  selector: 'app-transacoes-pendentes',
  templateUrl: './transacoes-pendentes.component.html',
  styleUrls: ['./transacoes-pendentes.component.scss']
})
export class TransacoesPendentesComponent implements OnInit {

  public transacoesPendentes = [];

  constructor(private microblockchainService:MicroblockchainService) { 
    this.transacoesPendentes = microblockchainService.buscarTransacoesPendentes();
  }

  ngOnInit(): void {
  }

  minerarTransacoesPendentes(){
    this.microblockchainService.minerarTransacoesPendentes();
  }

}

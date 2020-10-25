import { Component, OnInit } from '@angular/core';
import { MicroblockchainService } from 'src/app/services/microblockchain.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  public microblockchain;

  constructor(private microblockchainService:MicroblockchainService) { 
    this.microblockchain = microblockchainService.microblockchainInstance;
  }

  ngOnInit(): void {
  }

}

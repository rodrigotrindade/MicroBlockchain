import { Component, OnInit } from '@angular/core';
import { MicroblockchainService } from 'src/app/services/microblockchain.service';

@Component({
  selector: 'app-microblockchain-viewer',
  templateUrl: './microblockchain-viewer.component.html',
  styleUrls: ['./microblockchain-viewer.component.scss']
})
export class MicroblockchainViewerComponent implements OnInit {
  public blocos = [];
  public blocoSelecionado = null;

  constructor(private microblockchainService:MicroblockchainService) {
    this.blocos = microblockchainService.buscarBlocos();
    this.blocoSelecionado = this.blocos[0];
  }

  ngOnInit(): void {
  }

  mostrarTransacoes(bloco){
    this.blocoSelecionado = bloco;
    
  }

}

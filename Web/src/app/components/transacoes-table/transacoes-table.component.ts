import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transacoes-table',
  templateUrl: './transacoes-table.component.html',
  styleUrls: ['./transacoes-table.component.scss']
})
export class TransacoesTableComponent implements OnInit {

  @Input() public transacoes = [];

  constructor() { }

  ngOnInit(): void {
  }

}

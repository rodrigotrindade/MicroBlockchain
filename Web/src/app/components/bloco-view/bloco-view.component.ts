import { Component, OnInit,Input } from '@angular/core';
import { MicroblockchainService } from '../../services/microblockchain.service';

@Component({
  selector: 'app-bloco-view',
  templateUrl: './bloco-view.component.html',
  styleUrls: ['./bloco-view.component.scss']
})
export class BlocoViewComponent implements OnInit {

  @Input() public bloco;

  constructor() { }

  ngOnInit(): void {
  }

}

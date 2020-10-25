import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MicroblockchainViewerComponent } from './pages/microblockchain-viewer/microblockchain-viewer.component';
import { BlocoViewComponent } from './components/bloco-view/bloco-view.component';
import { TransacoesTableComponent } from './components/transacoes-table/transacoes-table.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { FormsModule } from '@angular/forms';
import { CriarTransacaoComponent } from './pages/criar-transacao/criar-transacao.component';
import { TransacoesPendentesComponent } from './pages/transacoes-pendentes/transacoes-pendentes.component';

@NgModule({
  declarations: [
    AppComponent,
    MicroblockchainViewerComponent,
    BlocoViewComponent,
    TransacoesTableComponent,
    ConfiguracoesComponent,
    CriarTransacaoComponent,
    TransacoesPendentesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

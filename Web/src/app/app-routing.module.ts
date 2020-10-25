import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { CriarTransacaoComponent } from './pages/criar-transacao/criar-transacao.component';
import { MicroblockchainViewerComponent } from './pages/microblockchain-viewer/microblockchain-viewer.component';
import { TransacoesPendentesComponent } from './pages/transacoes-pendentes/transacoes-pendentes.component';

const routes: Routes = [
  { path:"",component:MicroblockchainViewerComponent },
  { path:"configuracoes", component:ConfiguracoesComponent },
  { path:"nova/transacao",component:CriarTransacaoComponent },
  { path:"nova/transacao/pendentes",component:TransacoesPendentesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { UserFormComponent } from './components/usuario-crud/usuario-form/user-form/user-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin-pag/admin/admin.component';
import { IndexComponent } from './components/index/index/index.component';
import { FormProdutoCreateComponent } from './components/produto/form-produto-create/form-produto-create.component';
import { ProdutoTableComponent } from './components/produto/produto-table/produto-table.component';
import { ProdutoComponent } from './components/produto/produto/produto.component';
import { UsuarioComponent } from './components/usuario-crud/usuario/usuario.component';
import { UserReadComponent } from './components/usuario-crud/usuario-read/user-read/user-read.component';
import { ClienteComponent } from './components/cliente/cliente/cliente.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { CategoriaComponent } from './components/categoria/categoria/categoria.component';
import { CategoriaCreateComponent } from './components/categoria/categoria-create/categoria-create.component';
import { CategoriaReadComponent } from './components/categoria/categoria-read/categoria-read.component';
import { DetalheProdutoComponent } from './components/produto/detalhe-produto/detalhe-produto/detalhe-produto.component';
import { CarrinhoComponent } from './components/carrinho/carrinho/carrinho.component';
import { ProdutoReadComponent } from './components/views/produto-read/produto-read.component';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido/finalizar-pedido.component';
import { LoginComponent } from './components/login/login/login.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta/criar-conta.component';
import { UsuarioConfigComponent } from './components/usuario-config-conta/usuario-config/usuario-config.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { authGuard } from './auth/auth';
import { authGuardAdmin } from './auth/authAdmin';
import { ProdutoFilterComponent } from './components/produto-filter/produto-filter/produto-filter.component';
import { PedidoComponent } from './components/pedido/pedido/pedido.component';


const routes: Routes = [
  {path: 'index', title: "home",  component: IndexComponent, children:[
    {path: '', component:ProdutoReadComponent},
    {path: 'detalhe-produto/:id', component: DetalheProdutoComponent},
    {path: 'finalizar-pedido/:id',canActivate: [authGuard], component: FinalizarPedidoComponent},//passar o id como parametro. id do pedido
    {path: 'carrinho-detalhe/:idUser',canActivate: [authGuard], title: "carrinho", component:CarrinhoComponent},
    {path: 'criar-conta', title: "Criar conta", component: CriarContaComponent},
    {path: 'user-config',canActivate: [authGuard], title: "informações", component: UsuarioConfigComponent},
    {path: 'categoria/:nome', component: ProdutoFilterComponent},
    {path: 'login', title: "login", component: LoginComponent}
   
  ]},
  {path: 'login', title: "login", component: LoginComponent},
  {path: 'logout', title: "home",  component: IndexComponent},
  /*
  {path: 'detalhe-produto/:id', component: DetalheProdutoComponent, children: [
    {path: 'carrinho-detalhe', component:CarrinhoComponent}
  ]},
  */
  {path: 'administracao-site', title: "Administração",canActivate: [authGuardAdmin], component: AdminComponent,
  children: [{path: '',canActivate: [authGuardAdmin], title: 'pedidos', component: PedidoComponent},
    {path: 'produto', canActivate: [authGuard], title: 'Administração/produto',
    component: ProdutoComponent, children: [{path: 'cadastrar', component: FormProdutoCreateComponent},
  {path: 'visualizar', component: ProdutoTableComponent}]}
    ,{path: 'usuario',canActivate: [authGuard],
  component: UsuarioComponent, children: [{path: 'cadastrar', component: UserFormComponent},
  {path: 'visualizar', component: UserReadComponent}]},
  {path: 'cliente',canActivate: [authGuard], component: ClienteComponent, children: [{path: 'cadastrar', component: ClienteCreateComponent},
  {path: 'visualizar', component: ClienteReadComponent}]},
  {path: 'categoria', canActivate: [authGuard], component: CategoriaComponent, children: [
    {path: 'cadastrar', component: CategoriaCreateComponent},
    {path: 'visualizar', component: CategoriaReadComponent}
  ]}
  ]},
  {path: 'carrinho-detalhe',canActivate: [authGuard], title: "carrinho", component: CarrinhoComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
   
}

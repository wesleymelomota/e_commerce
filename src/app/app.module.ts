import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header/header.component';
import { HomeComponent } from './components/home/home/home.component';
import { IndexComponent } from './components/index/index/index.component';
import { AdminComponent } from './components/admin-pag/admin/admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ProdPromoComponent } from './components/produto-promocao/prod-promo/prod-promo.component';
import {MatCardModule} from '@angular/material/card';
import { ProdutoReadComponent } from './components/views/produto-read/produto-read.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './components/footer/footer/footer.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProdutoComponent } from './components/produto/produto/produto.component';
import { FormProdutoCreateComponent } from './components/produto/form-produto-create/form-produto-create.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { ProdutoTableComponent } from './components/produto/produto-table/produto-table.component';
import { UsuarioComponent } from './components/usuario-crud/usuario/usuario.component';
import { UserFormComponent } from './components/usuario-crud/usuario-form/user-form/user-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserReadComponent } from './components/usuario-crud/usuario-read/user-read/user-read.component';
import { ClienteComponent } from './components/cliente/cliente/cliente.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { CategoriaComponent } from './components/categoria/categoria/categoria.component';
import { CategoriaCreateComponent } from './components/categoria/categoria-create/categoria-create.component';
import { CategoriaReadComponent } from './components/categoria/categoria-read/categoria-read.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTreeModule} from '@angular/material/tree';
import { DetalheProdutoComponent } from './components/produto/detalhe-produto/detalhe-produto/detalhe-produto.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CarrinhoComponent } from './components/carrinho/carrinho/carrinho.component';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido/finalizar-pedido.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LoginComponent } from './components/login/login/login.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta/criar-conta.component';
import { UsuarioConfigComponent } from './components/usuario-config-conta/usuario-config/usuario-config.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { ProdutoFilterComponent } from './components/produto-filter/produto-filter/produto-filter.component';
import { PedidoComponent } from './components/pedido/pedido/pedido.component';
import { EmailFormComponent } from './components/emailService/email-form/email-form.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    IndexComponent,
    AdminComponent,
    ProdPromoComponent,
    ProdutoReadComponent,
    FooterComponent,
    ProdutoComponent,
    FormProdutoCreateComponent,
    ProdutoTableComponent,
    UsuarioComponent,
    UserFormComponent,
    UserReadComponent,
    ClienteComponent,
    ClienteReadComponent,
    ClienteCreateComponent,
    CategoriaComponent,
    CategoriaCreateComponent,
    CategoriaReadComponent,
    DetalheProdutoComponent,
    CarrinhoComponent,
    FinalizarPedidoComponent,
    LoginComponent,
    CriarContaComponent,
    UsuarioConfigComponent,
    PageNotFoundComponent,
    ProdutoFilterComponent,
    PedidoComponent,
    EmailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTreeModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

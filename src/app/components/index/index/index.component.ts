import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CarrinhoService } from 'src/app/service/service-carrinho-compra/carrinho.service';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';

export interface Filtro{
  nome: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(private service: CarrinhoService, private sessao: SessaoService, private route: ActivatedRoute,
    private serviceUser: UsuarioService, private authService: AuthService, private router: Router){}
  quantidadeCarrinho = ""
  idUser = false;
  id = 0;
  filter: Filtro = {
    nome: ''
  }
  /**
   * na primeria vez quando entra na aplicacao, não esta vindo os dados, esta dando erro na solicitacao, autenticacao
   */
  ngOnInit(): void {
      
      this.idUser = Number(this.route.snapshot.paramMap.get('id')) > 0 ? true: false;
      this.sessao.setIdUser(Number(this.route.snapshot.paramMap.get('id')));
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      if(this.id > 0){
        this.serviceUser.getUser(this.id).subscribe(user => {
          this.quantidadeCarrinho = String(user.cliente.pedidos[0].itens.length)  
        })
      }
      this.service.quantidade$.subscribe(quantidade => {
        this.quantidadeCarrinho = String(quantidade)
        })
  }
  
  search(): void{
    
    this.router.navigate([`index/filter/${this.filter.nome}`])
  }
  logout(): void{
    sessionStorage.clear()
    this.idUser = true;
    this.router.navigate(['/login'])
  }
}

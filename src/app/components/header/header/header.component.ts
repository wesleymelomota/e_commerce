import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/service/service-carrinho-compra/carrinho.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private service: CarrinhoService){}
  //quantidadeCarrinho: number = this.service.carrinho.itens.length;
  ngOnInit(): void {
   /*this.quantidadeCarrinho = this.service.carrinho.itens.length
   console.log(this.service.carrinho.itens.length)*/
  }
}

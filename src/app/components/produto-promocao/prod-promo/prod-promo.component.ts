import { ProdutoService } from 'src/app/service/service-produto/produto.service';
import { Component } from '@angular/core';
import { Produto } from 'src/app/models/Produto.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prod-promo',
  templateUrl: './prod-promo.component.html',
  styleUrls: ['./prod-promo.component.css']
})
export class ProdPromoComponent {
  urlImagem = "../../../../assets/produto/"
  produtos: Produto[] = [];
  produtoPromocao = false;
  
  constructor(private service: ProdutoService, private http: HttpClient){}

  ngOnInit(): void {
    this.service.obterTodos().subscribe(produto => {
      this.produtos = produto.filter(p => p.promocao == true)
      if(this.produtos.length > 0){
        this.produtoPromocao = true;
      }
      
    })
  }
}

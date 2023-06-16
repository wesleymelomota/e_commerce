import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/service/service-produto/produto.service';


@Component({
  selector: 'app-produto-filter',
  templateUrl: './produto-filter.component.html',
  styleUrls: ['./produto-filter.component.css']
})
export class ProdutoFilterComponent implements OnInit{
  constructor(private route: ActivatedRoute, private service: ProdutoService){}
  produtos: Produto[] = [];
  
  urlImagem = "../../../../assets/produto/"
  ngOnInit(): void {
      const nomeCategoriaOrProduto = this.route.snapshot.paramMap.get("nome");
      console.log(nomeCategoriaOrProduto)
      this.service.getProdutosPorCategoria(String(nomeCategoriaOrProduto)).subscribe(produtos => {
        this.produtos = produtos
        //this.filtrar(String(nomeCategoriaOrProduto));
      })
  }
  /*filtrar(nome: string): void{
    this.produtosFiltrado = this.produtos.filter(produto => produto.categoria.nome == nome)
    console.log(this.produtosFiltrado)
  }*/
}

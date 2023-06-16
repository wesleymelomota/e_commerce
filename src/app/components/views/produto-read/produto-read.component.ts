import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria.model';
import { Produto } from 'src/app/models/Produto.model';
import { CategoriaService } from 'src/app/service/service-categoria/categoria.service';
import { ProdutoService } from 'src/app/service/service-produto/produto.service';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';
export interface Filtro{
  nome: string;
}
@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit{

  urlImagem = "../../../../assets/produto/"
  produtos: Produto[] = [];
  produtosPromocao: Produto[] = [];
  //produtosFiltrados: Produto[] =[];
  categorias: Categoria[] = [];
  produtoPromocao = false;
  filtro: Filtro = {
    nome: ''
  }
  constructor(private service: ProdutoService, private sessao: SessaoService, private serviceCategori: CategoriaService){}
  ngOnInit(): void {
    this.service.obterTodos().subscribe(produto => {
      this.produtos = produto;
    
      this.produtosPromocao = produto.filter(produto => produto.promocao == true);
      if(this.produtosPromocao.length > 0){
        this.produtoPromocao = true;
      }
      
    })
    this.serviceCategori.findAll().subscribe(categoria => {
      this.categorias = categoria
    })
  }
  formatadorMoeda(valor: number): string {
    let options = {style: 'currency', currency: 'BRL'}
    return valor.toLocaleString('pt-BR', options)
  }
  search():void{
    this.service.obterTodos().subscribe(produto => {
      //this.produtos = produto;
      if(this.filtro.nome == ''){
        this.produtos = produto
      }
      this.produtos = produto.filter(produto => produto.nome == this.filtro.nome);
    })
    
  }

}

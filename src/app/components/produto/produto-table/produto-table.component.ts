import { Categoria } from 'src/app/models/Categoria.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/service/service-produto/produto.service';
import { CategoriaService } from 'src/app/service/service-categoria/categoria.service';
import { Router } from '@angular/router';

export interface Imagem {
  dados: Blob
}

@Component({
  selector: 'app-produto-table',
  templateUrl: './produto-table.component.html',
  styleUrls: ['./produto-table.component.css']
})

export class ProdutoTableComponent implements OnInit{
  //<button type="button" class="btn-close" aria-label="Close"></button> para colocar no snakbar como action
  constructor(private service: ProdutoService, private _snackBar: MatSnackBar,
     private categoriaService: CategoriaService, private router: Router){}

  produto: Produto = {
    id: null,
    nome: '',
    preco: null,
    descricao: '',
    promocao: false,
    categoria: {id: null,  nome: ''},
    urlImagem: ''
  };

  file: Blob = new Blob;
  imagem: Imagem = {
    dados: this.file
  }
  baseUrl: any

  produtos: Produto[] = []
  categorias: Categoria[] = []
  
  updateProduct = false;
  urlImagem: any;
  displayedColumns: string[] = ['nome', 'preco',  'promocao', 'categoria', 'acoes'];

  dataSource:  MatTableDataSource<Produto> =  new MatTableDataSource<Produto>();

  ngOnInit(): void {
    this.service.obterTodos().subscribe(objs => {
      this.dataSource = new MatTableDataSource<Produto>(objs);
    })
    this.categoriaService.findAll().subscribe(objs => {
      this.categorias = objs
    })
  }
  
  deletar(id: number): void{
    if(confirm("Excluir ?")){
      this.service.excluir(id).subscribe(msg => {
        this._snackBar.open(msg.mensagem, "X", {duration: 3000})
        this.router.navigate(['/administracao-site/produto'])
      })

    }else{
      
    }
  }
  updateFildsForm(id: number){
    this.service.getProduto(id).subscribe(produto => {
      this.produto = produto
      this.updateProduct = true;
      this.urlImagem = `../../../assets/produto/${produto.urlImagem}`
      
    })
  }
  save(): void{
    this.service.update(this.produto, this.imagem).subscribe(dados => {
      this._snackBar.open("Produto atualizado com sucesso!", "X", {duration: 3000})
      this.router.navigate(['/administracao-site/produto/visualizar'])
    })
    
  }

  cancel(): void{
    this.updateProduct = false;
  }
  inputFile(event: any){
    if(event.target.files && event.target.files[0]){
      const foto = event.target.files[0];
      var reader = new FileReader();
      this.imagem.dados = foto
      reader.onload = (event: any) => {
        this.baseUrl = event.target.result;        
        this.produto.urlImagem = foto.name   
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    
 }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
}

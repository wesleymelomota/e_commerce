import { ImagemProduto } from 'src/app/models/ImagemProduto.model';
import { Categoria } from './../../../models/Categoria.model';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/Produto.model';
import { CategoriaService } from 'src/app/service/service-categoria/categoria.service';
import { ProdutoService } from 'src/app/service/service-produto/produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-produto-create',
  templateUrl: './form-produto-create.component.html',
  styleUrls: ['./form-produto-create.component.css']
})
export class FormProdutoCreateComponent implements OnInit{
  constructor(private service: CategoriaService, private serviceProduto: ProdutoService, private snack: MatSnackBar,
    private router: Router){}

  categoria: Categoria = {
    id: null,
    nome: ''
  }
  categorias: Categoria[] = [];
  
  file?: File;

  produtoChecked = false;

  produto: Produto = {
    nome: '',
    preco: null,
    descricao: '',
    promocao: this.produtoChecked,
    urlImagem: '',
    categoria: this.categoria
  }
  foto: Blob = new Blob()/* | string*/;
  imagem: ImagemProduto ={
    dados: this.foto
  }
  baseUrl: any;
  
 ngOnInit(): void {
   this.service.findAll().subscribe(obj => {
    this.categorias = obj
   })
   
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
 cancel(): void{

   this.router.navigate(['/administracao-site/produto'])
 }
 clearFilds(): void{
  this.produto.categoria = {nome: '', }
  this.produto.descricao = ''
  this.produto.nome = ''
  this.produto.preco = null;
  this.produto.promocao = false;
  this.produto.urlImagem = ''

 }
 submit(): void{
  this.serviceProduto.save(this.produto, this.imagem).subscribe(data => {
    console.log(data)
    this.snack.open(`Produto ${data.nome} salvo com sucesso!`, "X", {duration: 2000})
    this.clearFilds();
  })
  
 }
 
 
}

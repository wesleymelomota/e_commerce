import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria.model';
import { CategoriaService } from 'src/app/service/service-categoria/categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit{

  constructor(private service: CategoriaService, private snack: MatSnackBar, private router: Router){}
  categoria: Categoria = {
    id: null,
    nome: ''
  }
  clearFild: Categoria = {
    id: null,
    nome: ''
  }
  ngOnInit(): void {
    
  }
  save(): void{
    this.service.save(this.categoria).subscribe(data => {
      this.snack.open(`Categoria ${data.nome} salvo com sucesso!`, "X", {duration: 3000})
      
    })
    this.cancel()
  }
  cancel(): void{
    this.categoria.nome = ''
  }
  
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria.model';
import { CategoriaService } from 'src/app/service/service-categoria/categoria.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>();

  isUpdate = false;

  constructor(private service: CategoriaService, private snack: MatSnackBar, private router: Router){}
  categoria: Categoria = {
    id: null,
    nome: ''
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(categorias => {
      this.dataSource = new MatTableDataSource<Categoria>(categorias);
    })
  }

  deletar(id: number): void{
    if(confirm("Excluir ?")){
      this.service.delete(id).subscribe(msg => {
        this.snack.open(msg.mensagem, "X", {duration: 3000})
        this.router.navigate(['admin/categoria'])
      })
    }
  }
  save(): void{
    this.service.update(this.categoria).subscribe(data => {
      this.snack.open(`Categoria ${data.nome} salvo com sucesso!`, "X", {duration: 3000})
      this.router.navigate(['admin/categoria'])
    })
    
  }
  cancel(): void{
    this.isUpdate = false;
  }
  updateFilds(id: number){
    this.service.getCategoria(id).subscribe(data => {
      this.categoria = data
      this.isUpdate = true;
    })
  }
}

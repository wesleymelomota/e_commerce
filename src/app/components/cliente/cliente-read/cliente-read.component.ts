import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente.model';
import { ClienteService } from 'src/app/service/service-cliente/cliente.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id','nome', 'dataNascimento', 'cpf', 'telefone', 'endereco', 'cep', 'acoes'];
  dataSource:  MatTableDataSource<Cliente> =  new MatTableDataSource<Cliente>();

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  
  constructor(private service: ClienteService, private snack: MatSnackBar, private router: Router){}
  //^15.2.8
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.service.findAll().subscribe(cliente => {
      this.dataSource = new MatTableDataSource<Cliente>(cliente);
    })
  }
  deletar(id: number): void{
    if(confirm("Excluir ?")){
      this.service.delete(id).subscribe(msg => {
          this.snack.open(msg.mensagem, "X", {duration: 3000})
          this.router.navigate(['admin/cliente'])
      })
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  del(id: number):void{
    
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit{
  constructor(private service: UsuarioService, private snackBar: MatSnackBar, private router: Router){}
  displayedColumns: string[] = ['name', 'username', 'email', 'role', 'acoes'];
  
  dataSource:  MatTableDataSource<Usuario> =  new MatTableDataSource<Usuario>();
  configSnackBar = {
    duration: 3000
  }
  
  hide = true;
  isUpdate = false;

  usuario: Usuario = {
    id: null,
    name: '',
    username: '',
    password: '',
    email: '',
    role: {id: null, nome: ''}, 
    cliente: {id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []}
  }
  //usuarios: Usuario[] = []

  ngOnInit(): void {
    this.service.findAll().subscribe(usuario => {
      this.dataSource = new MatTableDataSource<Usuario>(usuario);
    })
  }
  deletar(id: number): void{
    if(confirm("Excluir ?")){
      this.service.delete(id).subscribe(msg => {
        this.snackBar.open(msg.mensagem, "X", this.configSnackBar);
        this.router.navigate(['/administracao-site/usuario/visualizar'])
      })
    }
  }
  updateFildsForm(id: number): void{
    this.service.getUser(id).subscribe(user => {
      this.usuario = user
      this.isUpdate = true;
    })
  }
  cancel(): void{
    this.isUpdate = false;
  }

  save(): void{
    this.service.update(this.usuario).subscribe(user => {
      this.snackBar.open(`Usuario ${user.name} atualizado com sucesso!`, "X", this.configSnackBar);
      this.router.navigate(['/administracao-site/usuario/visualizar'])
      this.isUpdate = false;
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
}

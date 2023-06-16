import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent {
  constructor(private service: UsuarioService, private snackBar: MatSnackBar, private router: Router){}
  usuario: Usuario = {
    id: null,
    name: '',
    username: '',
    password: '',
    email: '',
    role: {id: null, nome: ''},
    cliente: {id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []}
  }
  hide = true

  save(): void{
    if(this.usuario.name || this.usuario.username || this.usuario.password || this.usuario.email == ''){
      this.snackBar.open(`Preencha os campos!`, "X", {duration: 2000})
      this.router.navigate(['/index/criar-conta'])
    }else{
      this.usuario.role = {id: 2, nome: "USER"}
      this.service.save(this.usuario).subscribe(data => {
        this.snackBar.open(`Usuario ${data.name} cadastrado com sucesso!`, "X", {duration: 2000})
        this.router.navigate(['login'])
      })
    }
  }
}

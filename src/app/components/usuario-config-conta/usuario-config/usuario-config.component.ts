import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { ClienteService } from 'src/app/service/service-cliente/cliente.service';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';

@Component({
  selector: 'app-usuario-config',
  templateUrl: './usuario-config.component.html',
  styleUrls: ['./usuario-config.component.css']
})
export class UsuarioConfigComponent implements OnInit{
  constructor(private serviceUsuario: UsuarioService, private sessao: SessaoService, private snack: MatSnackBar,
    private serviceCliente: ClienteService, private router: Router){}

  hide = true;

  usuario: Usuario = {
    id: null,
    name: '',
    username: '',
    password: '',
    email: '',
    role: {id: null, nome: ''},
    cliente: {id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []}
  }
  cliente: Cliente = {
    id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []
  }
  clienteClearFild: Cliente = {
    id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []
  }
  clearFild: Usuario = {
    id: null,
    name: '',
    username: '',
    password: '',
    email: '',
    role: {id: null, nome: ''},
    cliente: {id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []}
  }
  ngOnInit(): void {
      
      this.serviceUsuario.getUser(this.sessao.getIdUser()).subscribe(user => {
        this.usuario = user;
        this.cliente = user.cliente
      })
  }
  save(): void{
    this.serviceUsuario.update(this.usuario).subscribe(user => {
      this.snack.open(`Informações atualizadas com secesso!`, "X", {duration: 2000})
      this.usuario = this.clearFild
    })
  }
  saveCliente(): void{
    this.serviceCliente.update(this.cliente).subscribe(cli => {
      this.snack.open(`Informações atualizadas com secesso!`, "X", {duration: 2000})
      this.cliente = cli
    })
  }
  excluirConta(): void {
    if(confirm("Realmente deseja deleta sua conta. após fazer, não poderá ser desfeito ?")){
      this.serviceUsuario.delete(Number(this.usuario.id)).subscribe(data => {
        this.snack.open(`Conta excluida com secesso!`, "X", {duration: 2000})
        this.router.navigate(['/index'])
      })
    }else{
      return;
    }
  }
}

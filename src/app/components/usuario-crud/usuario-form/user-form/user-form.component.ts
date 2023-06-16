import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from 'src/app/models/Role.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  constructor(private service: UsuarioService, private snackBar: MatSnackBar){}

  usuario: Usuario = {
    id: null,
    name: '',
    username: '',
    password: '',
    email: '',
    role: {id: null, nome: ''},
    cliente: {id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []}
  }
  
  roles: Role[] = []

  configSnackBar = {
    duration: 2000
  }

  ngOnInit(): void {
    this.service.getRoles().subscribe(roles => {
      this.roles = roles
    })
  }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  save(): void{
    this.service.save(this.usuario).subscribe(data => {
      this.snackBar.open(`Usuario ${data.name} cadastrado com sucesso!`, "X", this.configSnackBar)
    })
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'não é um email valido. acrescente @' : '';
  }

}

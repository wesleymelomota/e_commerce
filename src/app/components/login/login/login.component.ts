import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Cliente } from 'src/app/models/Cliente.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/service/login-service/login.service';
import { ClienteService } from 'src/app/service/service-cliente/cliente.service';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private service: LoginService, private sessao: SessaoService, private router: Router, 
    private auth: AuthService, private snack: MatSnackBar){}

  hide = true;
  login: Login = {
    username: '',
    password: ''
  }
  ngOnInit(): void {
      sessionStorage.clear()
  }
  /**
   * 
   */
  save(): void {
    
    this.service.logar(this.login).subscribe(sessao => {
      if(sessao.id > 0){
        this.sessao.setToken(sessao.token);
        this.sessao.setIdUser(sessao.id);
        this.sessao.setPerfil(String(sessao.perfil));
        sessionStorage.setItem("token",sessao.token);
        sessionStorage.setItem("perfil", String(sessao.perfil));

        if(sessao.perfil === "ADMIN"){
          this.router.navigate(['/administracao-site'])
        }else{
          this.router.navigate(['/index', {id: sessao.id}])
        }
        
      }else{
        this.snack.open(String(sessao.mensage), "X", {duration: 3000})
        this.router.navigate(['/index'])
      }
    })

    }
}

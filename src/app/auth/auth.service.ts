import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { SessaoService } from '../service/sessao-service/sessao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessao: SessaoService) { }
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(): void {
  
    if(this.sessao.getToken() != ''){
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
      console.log(this.sessao.getToken())
      console.log(this.sessao.getToken() != '')
    }
    
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

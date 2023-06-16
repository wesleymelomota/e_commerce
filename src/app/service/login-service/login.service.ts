import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sessao } from 'src/app/models/Sessao.dto';
import { Login } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/login'
  
  constructor(private http: HttpClient) { }

  logar(login: Login): Observable<Sessao>{
    return this.http.post<Sessao>(`${this.baseUrl}`, login)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/Role.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { Msg } from '../service-produto/produto.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http: HttpClient) { }
  private token = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `${sessionStorage.getItem("token")}`
    })
  };
  
  baseUrlRole = 'http://localhost:8080/role'
  baseUrlUser = 'http://localhost:8080/usuario'

  getRoles(): Observable<Role[]>{
    
    return this.http.get<Role[]>(`${this.baseUrlRole}/obter-todos`, this.httpOptions)
  }
  save(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrlUser}/create`, usuario)
  }
  //excluir os console.log 
  findAll(): Observable<Usuario[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    
    return this.http.get<Usuario[]>(`${this.baseUrlUser}/obter-todos`, this.httpOptions)
  }
  /**/
  update(user: Usuario): Observable<Usuario>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.put<Usuario>(`${this.baseUrlUser}/update`, user, this.httpOptions)
  }
  addCliente(user: Usuario): Observable<Usuario>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.put<Usuario>(`${this.baseUrlUser}/add/cliente`, user, this.httpOptions)
  }

  delete(id: number): Observable<Msg> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrlUser}/excluir/${id}`, this.httpOptions)
  }
  getUser(id: number): Observable<Usuario> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.get<Usuario>(`${this.baseUrlUser}/obter/${id}`, this.httpOptions)
  }
}

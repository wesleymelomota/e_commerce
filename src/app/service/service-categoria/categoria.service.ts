import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria.model';
import { Produto } from 'src/app/models/Produto.model';
import { Msg } from '../service-produto/produto.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl = 'http://localhost:8080/categoria'
  constructor(private http: HttpClient) { }
  private token = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      /*'Content-Type':  'application/json',*/
      Authorization: 'my-auth-token'
    })
  };

  save(categoria: Categoria): Observable<Categoria>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.post<Categoria>(`${this.baseUrl}/create`, categoria, this.httpOptions)
  }
  delete(id: number): Observable<Msg>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrl}/excluir/${id}`, this.httpOptions)
  }
  findAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.baseUrl}/obter-todos`)
  }
  getCategoria(id: number): Observable<Categoria>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.get<Categoria>(`${this.baseUrl}/obter/${id}`, this.httpOptions)
  }
  update(Categoria: Categoria): Observable<Categoria>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.put<Categoria>(`${this.baseUrl}/update`, Categoria, this.httpOptions)
  }
}

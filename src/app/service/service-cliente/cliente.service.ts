import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente.model';
import { Msg } from '../service-produto/produto.service';
import { Pedido } from 'src/app/models/Pedido.model';
import { Sessao } from 'src/app/models/Sessao.dto';
import { SessaoService } from '../sessao-service/sessao.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private sessao: SessaoService) { }
  private baseUrl = 'http://localhost:8080/cliente'

  private httpOptions = {
    headers: new HttpHeaders({
      /*'Content-Type':  'application/json',*/
      Authorization: 'my-auth-token'
    })
  };

  //excluir/pedido/{id}
  findAll(): Observable<Cliente[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.get<Cliente[]>(`${this.baseUrl}/obter-todos`, this.httpOptions)
  }
  delete(id: number): Observable<Msg>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrl}/excluir/${id}`, this.httpOptions)
  }
  save(cliente: Cliente): Observable<Cliente>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.post<Cliente>(`${this.baseUrl}/create`, cliente, this.httpOptions)
  }
  update(cliente: Cliente): Observable<Cliente>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.put<Cliente>(`${this.baseUrl}/update`, cliente, this.httpOptions)
  }
  getPedidoCliente(id: number): Observable<Pedido[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.get<Pedido[]>(`${this.baseUrl}/obter/pedido/${id}`, this.httpOptions)
  }
  deletarPedido(idCliente: number): Observable<Msg>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrl}/excluir/pedido/${idCliente}`, this.httpOptions)
  }
  limparItensPedido(idCliente: number): Observable<Msg>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrl}/excluir/pedido/${idCliente}`, this.httpOptions)
  }
}

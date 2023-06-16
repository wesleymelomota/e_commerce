import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/Item.model';
import { Pedido } from 'src/app/models/Pedido.model';
import { Msg } from '../service-produto/produto.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  
  private baseUrlPedido = 'http://localhost:8080/pedido'
  private baseUrlItem = 'http://localhost:8080/item'
  private token = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      
      Authorization: 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }
 
  private quantidadeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  quantidade$ = this.quantidadeSubject.asObservable();

  atualizarQuantidade(quantidade: number) {
    this.quantidadeSubject.next(quantidade);
  }
  
  getPedidos(): Observable<Pedido[]>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.get<Pedido[]>(`${this.baseUrlPedido}/obter-todos`, this.httpOptions)
  }
  
  createPedido(pedido: Pedido): Observable<Pedido>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.post<Pedido>(`${this.baseUrlPedido}/create`, pedido, this.httpOptions)
  }
  addItemCarrinho(idPedido: number, item: Item): Observable<Pedido>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.put<Pedido>(`${this.baseUrlPedido}/add/item/${idPedido}`, item, this.httpOptions)
  }
  updatePedido(pedido: Pedido): Observable<Pedido>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.put<Pedido>(`${this.baseUrlPedido}/update`, pedido, this.httpOptions)
  }
  deletarPedido(id: number): Observable<Msg>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrlPedido}/excluir/${id}`, this.httpOptions)
  }
  createItem(item: Item): Observable<Item>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.post<Item>(`${this.baseUrlItem}/create`, item, this.httpOptions)
  }
 
  getItem(id: number): Observable<Item>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.get<Item>(`${this.baseUrlItem}/obter/${id}`, this.httpOptions)
  }
  excluirItem(id: number): Observable<Msg>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrlItem}/excluir/${id}`, this.httpOptions)
  }
}

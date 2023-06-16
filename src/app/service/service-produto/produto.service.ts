import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/Produto.model';
import { ImagemProduto } from 'src/app/models/ImagemProduto.model';
import { Email } from 'src/app/models/Email.dto.model';
import { Pedido } from 'src/app/models/Pedido.model';
import { EmailService } from 'src/app/components/emailService/email.service';

export interface Msg {
  mensagem: string
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient, private emailService: EmailService) { }
  
  baseUrl = 'http://localhost:8080/produto'
  private token = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `${sessionStorage.getItem("token")}`
    })
  };
  private emailConfirm: Email = {
    emailFrom: '',
    emailTo: '',
    ownerRef: '',
    subject: '',
    text: ''
  }

  save(produto: Produto, imagemPro: ImagemProduto): Observable<Produto>{
    const formData = new FormData();
    
    formData.append('nome', produto.nome)
    formData.append('preco', `${produto.preco}`)
    formData.append('descricao', produto.descricao)
    formData.append('promocao', `${produto.promocao}`)
    formData.append('categoriaId', `${produto.categoria.id}`)
    formData.append('imagem', imagemPro.dados, produto.urlImagem)
    return this.http.post<Produto>(`${this.baseUrl}/create`,  formData, this.httpOptions )
  }
  update(produto: Produto, imagemPro: ImagemProduto): Observable<Produto>{
    const formData = new FormData();
    
    formData.append('id', `${produto.id}`)
    formData.append('nome', produto.nome)
    formData.append('preco', `${produto.preco}`)
    formData.append('descricao', produto.descricao)
    formData.append('promocao', `${produto.promocao}`)
    formData.append('categoriaId', `${produto.categoria.id}`)
    formData.append('imagem', imagemPro.dados, produto.urlImagem)
    return this.http.put<Produto>(`${this.baseUrl}/update`,  formData, this.httpOptions )
  }
  obterTodos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/obter-todos`)
  }
  excluir(id: number): Observable<Msg>{
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.delete<Msg>(`${this.baseUrl}/excluir/${id}`, this.httpOptions)
  }
  getProduto(id: number): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}/obter/${id}`)
  }
  getProdutosPorCategoria(nome: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/obter/categoria/${nome}`)
  }
  sendEmailConfirm(emailCli: String, nomeCliente: String, total: number): void{
    this.emailConfirm.emailFrom = "dev.wesley.melo0701@gmail.com"//emailCli;
    this.emailConfirm.emailTo = "wesleymota382@gmail.com";
    this.emailConfirm.ownerRef = "Loja Virtual";
    this.emailConfirm.subject = "Confirmação de Compra";
    this.emailConfirm.text = `Obrigado pela compra, ${nomeCliente}. Seu pedido foi gerado. valor total do seu pedido:
    ${total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`;
    this.emailService.sendEmailConfirmProduct(this.emailConfirm).subscribe(email => console.log(email))
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './../../../../service/service-produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/Produto.model';
import { Item } from 'src/app/models/Item.model';
import { CarrinhoService } from 'src/app/service/service-carrinho-compra/carrinho.service';
import { Pedido } from 'src/app/models/Pedido.model';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';
import { ClienteService } from 'src/app/service/service-cliente/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/Cliente.model';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit{
  constructor(private service: ProdutoService, private route: ActivatedRoute, private serviceCar: CarrinhoService
    ,private router: Router, private sessao: SessaoService, private serviceUser: UsuarioService,
     private snack: MatSnackBar, private serviceCli: ClienteService){}

  hidden = false;
  idUser: number = 0;

  quantidadeCarrinho = 0

  produto: Produto = {
    id: null,
    nome: '',
    preco: null,
    descricao: '',
    promocao: false,
    categoria: {id: null, nome: ''},
    urlImagem: ''
  }
  item: Item = {
    id: null,
    quantidade: null,
    preco: this.produto.preco,
    produto: this.produto
  }
  private pedido: Pedido = {
    id: null,
    dataCompra: null,
    total: null,
    itens: [],
    status: null
  }
  cliente: Cliente = {
    id: null,
    nome: '',
    dataNascimento: null,
    endereco: '',
    cpf: '',
    telefone: '',
    cep: '',
    pedidos: []
  }
  private usuario: Usuario = {
    id: null,
    name: '',
    username: '',
    password: '',
    email: '',
    role: {id: null, nome: ''},
    cliente: {id: null,
      nome: '',
      dataNascimento: null,
      endereco: '',
      cpf: '',
      telefone: '',
      cep: '',
      pedidos: []}
  }

  temPedido = true;
  urlImagem = "../../../assets/produto/"
 
  formCliente = false;
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.getProduto(Number(id)).subscribe(produto => {
      //acrescentando um produto ao item, assim que o component é construido.
      this.produto = produto
      this.item.produto = produto
      this.item.quantidade = 1;
      this.item.preco = produto.preco
    })
    this.idUser = this.sessao.getIdUser()
    if(this.sessao.getIdUser() > 0){
      this.serviceUser.getUser(this.sessao.getIdUser()).subscribe(user => {
        this.usuario = user
        
      
        if(Number(user.cliente.id) > 0){
          this.formCliente = false;
          this.cliente = user.cliente
          user.cliente.pedidos.forEach(pedido => this.pedido = pedido);
          if(user.cliente.pedidos.length > 0){
            this.pedido = user.cliente.pedidos[0];
            this.temPedido = false;
          }
        }
        
      })
    }

  }

  createCliente(): void{
    this.serviceCli.save(this.cliente).subscribe(cliente => {
      this.cliente = cliente
      this.usuario.cliente = cliente
    })
  }
  save(): void{
    this.createCliente();
    this.formCliente = false
    this.snack.open(`Cadastro realizado `, "X", {duration: 2000})
    
  }
  addClienteInUser(): void{
    if(this.usuario.cliente == null){
      this.serviceUser.addCliente(this.usuario).subscribe(user => {
        this.usuario = user
      })
    }
  }
  cancelForm(): void{
    this.formCliente = false;
  }
  createItem(): void{
    this.serviceCar.createItem(this.item).subscribe(item => {
      this.item = item;
      this.pedido.itens.push(item)
      item = item
    })
  }
  updateCliente(): void{
    this.serviceCli.update(this.usuario.cliente).subscribe(cliente => {
      this.usuario.cliente = cliente
    })
  }
  
  addCarrinho(): void{
    if(this.idUser > 0){
      if(Number(this.cliente.id) ==  0){
        this.formCliente = true;
        return;
      }
      
      if(this.temPedido){
        if(Number(this.cliente.id) > 0 && this.pedido.id == null){
          this.createItem();
          let total = 0.0;
  
          this.pedido.itens.push(this.item)//add item em pedido
          this.pedido.itens.forEach(item => total += Number(item.preco) * Number(item.quantidade))//soma total
          this.pedido.total = total;//cestando total em pedido
          this.serviceCar.createPedido(this.pedido).subscribe(data => {data //criando pedido
            this.serviceCar.addItemCarrinho(Number(data.id), this.item).subscribe(pedido => {
              this.pedido = pedido
              this.usuario.cliente.pedidos.push( pedido)//add pedido para o cliente
              this.updateCliente();//atualiza o cliente com os itens adicionados ao pedido

              this.serviceUser.update(this.usuario).subscribe(user => {user //atualizando o user para receber o cliente com pedido
                this.pedido = user.cliente.pedidos[0];
                this.serviceCar.atualizarQuantidade(pedido.itens.length);
                this.snack.open(`Produto ${this.produto.nome} adicionado ao carrinho`, "X", {duration: 2000})
                this.router.navigate([`/index`, {id: this.usuario.id}])
                  
                })
            
              })
               
            })
            
          
        }else{
          this.serviceCar.addItemCarrinho(Number(this.pedido.id), this.item).subscribe(data => {
            this.serviceCar.atualizarQuantidade(data.itens.length);
            this.snack.open(`Produto ${this.produto.nome} adicionado ao carrinho`, "X", {duration: 2000})
            this.router.navigate([`/index`, {id: this.usuario.id}])
            
          })
        }
      }
        else{
        this.serviceCar.addItemCarrinho(Number(this.pedido.id), this.item).subscribe(data => {
          this.serviceCar.atualizarQuantidade(data.itens.length);
          this.snack.open(`Produto ${this.produto.nome} adicionado ao carrinho`, "X", {duration: 2000})
          this.router.navigate([`/index`, {id: this.usuario.id}])
          
        })
      }
    }else{
      this.snack.open(`Você precisa se logar para comprar este item!`, "X", {duration: 4000})
      this.router.navigate([`/login`])
    }
    
  }
  comprar(): void{
    if(this.idUser > 0){
      this.serviceCar.createItem(this.item).subscribe(item => {

        this.router.navigate([`index/finalizar-pedido/${item.id}`])
      })
    }else{
      this.router.navigate([`/login`])
    }
  }
  cancel(): void{
    this.router.navigate(['index'])
  }
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}

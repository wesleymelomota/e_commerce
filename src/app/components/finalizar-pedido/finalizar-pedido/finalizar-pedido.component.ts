import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente.model';
import { Item } from 'src/app/models/Item.model';
import { Pedido } from 'src/app/models/Pedido.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { CarrinhoService } from 'src/app/service/service-carrinho-compra/carrinho.service';
import { ClienteService } from 'src/app/service/service-cliente/cliente.service';
import { ProdutoService } from 'src/app/service/service-produto/produto.service';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})
export class FinalizarPedidoComponent implements OnInit{
  constructor(private router: ActivatedRoute, private service: CarrinhoService, private snack: MatSnackBar,
    private route: Router, private sessao: SessaoService, private serviceUser: UsuarioService, 
    private serviceCli: ClienteService, private serviceProduto: ProdutoService){}

  total: number = 0.0;
  totalFormatado: string = ''

  private  idItem: number = 0
  existCliente = false;
  pedidoFechado = false

  private usuario: Usuario = {
    id: null,
    name: '',
    username: '',
    password: '',
    email: '',
    role: {id: null, nome: ''},
    cliente: {id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []}
  }
  cliente: Cliente = {
    id: null, nome: '', dataNascimento: null, endereco: '', telefone: '', cpf: '', cep: '', pedidos: []
  }
  item: Item = {
    id: null,
    quantidade: null,
    preco: null,
    produto: {id: null, nome: '', preco: null, descricao: '', 
    promocao: false, categoria: {id: null, nome: ''}, urlImagem: ''},
    
  }
  
  pedido: Pedido = {
    id: null,
    total: null,
    dataCompra: null,
    status: null,
    itens: [],
    
  }
  /**
   */
  ngOnInit(): void {
      const id = this.router.snapshot.paramMap.get('id');
      
      this.idItem = Number(id);
      this.service.getItem(Number(id)).subscribe(item => {
        this.item = item
        
      })
      this.serviceUser.getUser(this.sessao.getIdUser()).subscribe(user => {
        this.total = Number(this.item.quantidade) * Number(this.item.produto.preco);
        this.usuario = user;
        if(user.cliente.id != null){//caso o usuario já tenha cadastro como cliente
          let total = 0;
          this.cliente = user.cliente
          this.pedido = user.cliente.pedidos[0]
          this.pedido.itens.push(this.item)
          this.pedido.itens.forEach(item => total += (Number(item.produto.preco) * Number(item.quantidade)))
          this.pedido.total = total;
          this.total = total;
          this.totalFormatado = this.formatadorMoeda(this.total);
          this.existCliente = true
          this.pedidoFechado = true;
        }
        
      })
  }
  formatadorMoeda(valor: number): string {
    let options = {style: 'currency', currency: 'BRL'}
    return valor.toLocaleString('pt-BR', options)
  }
  save(): void{
    
    this.pedido.total = this.total;
    this.pedido.itens.push(this.item);
  
    this.service.createPedido(this.pedido).subscribe(pedido => {
      this.snack.open(`Cadastro realizado com sucesso!` , "X", {duration: 2000})
      this.pedido = pedido 
      this.cliente.pedidos.push(pedido)
    
    })
    this.pedidoFechado = true;
  }
  addClienteInUser(): void{
    this.usuario.cliente = this.cliente;
    this.serviceUser.addCliente(this.usuario).subscribe(user => {
      user
    })
  }
  addItemPedido(): void{
    this.service.addItemCarrinho(Number(this.pedido.id), this.item).subscribe(pedido => {
      this.pedido = pedido;
    })
  }
  updateCliente(): void{
    //this.pedido.itens.push(this.item)
    this.addItemPedido();
    this.pedido.status = "Finalizado";
    this.cliente.pedidos[0] = this.pedido;
    this.serviceCli.update(this.cliente).subscribe(cliente => {
      this.cliente = cliente
      console.log(cliente)
    })
  }
  finalizar(): void{
    
    if(this.cliente.id != null){
      this.updateCliente()
      
      this.serviceCli.limparItensPedido(Number(this.cliente.id)).subscribe(msg => {
        this.snack.open(`Obrigado pela preferência!` , "X", {duration: 2000})
      })
      //this.serviceProduto.sendEmailConfirm(this.usuario.email, this.cliente.nome, this.total);
      this.service.atualizarQuantidade(0);
      
      this.route.navigate(['index'])

    }else{
      this.cliente.pedidos[0].status = "Finalizado";
      this.serviceCli.save(this.cliente).subscribe(cli => {
        this.cliente = cli
        this.addClienteInUser()
        this.serviceProduto.sendEmailConfirm(this.usuario.email, this.cliente.nome, this.total);
        this.serviceCli.limparItensPedido(Number(this.cliente.id)).subscribe(msg => {
          this.snack.open(`Obrigado pela preferência!` , "X", {duration: 2000})
        })
        this.route.navigate(['index']);
      })

    }
    
  }
  cancel(): void{
    if(this.idItem > 0)
    this.service.excluirItem(this.idItem).subscribe(msg =>{
      console.log(msg)
      this.snack.open("Compra cancelada!", "X", {duration: 2000})
      this.route.navigate(['index'])
    })
    this.route.navigate(['index'])
  }
}

import { Component, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente.model';
import { Item } from 'src/app/models/Item.model';
import { Pedido } from 'src/app/models/Pedido.model';
import { CarrinhoService } from 'src/app/service/service-carrinho-compra/carrinho.service';
import { ClienteService } from 'src/app/service/service-cliente/cliente.service';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit, OnChanges {

  total = 0.0;
  displayedColumns: string[] = ['id', 'quantidade', 'produto', 'preco', 'acoes'];

  dataSource: Item[] = []; 
  pedido: Pedido = {
    id: null,
    dataCompra: null,
    total: null,
    status: null,
    itens: []
  };
  cliente: Cliente = {
    id: null,
    nome: '',
    dataNascimento: null,
    telefone: '',
    cpf: '',
    endereco: '',
    cep: '', 
    pedidos: []
  }
  itens: Item[] = [];
  itemsFiltrados: Item[] = [];
  private idUser = 0;
  pedidoFinalizar = false;
  temPedido = false;

  constructor(private service: CarrinhoService, private serviceCli: ClienteService, private sessao: SessaoService,
    private serviceUser: UsuarioService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar){}
  ngOnInit(): void {
      
      this.idUser = this.sessao.getIdUser();
    
      this.serviceUser.getUser(this.idUser).subscribe(user => {
        if(user.cliente.id != null){
          this.cliente = user.cliente
          this.serviceCli.getPedidoCliente(Number(user.cliente.id)).subscribe(pedido => {
            pedido.forEach(p =>{ this.dataSource = p.itens
             p.itens.forEach(item => this.total +=  Number(item.preco) * Number(item.quantidade))
             this.pedido = p;
              if(p.itens.length > 0){
                this.itens = p.itens
                this.temPedido = true;
              }
           })
          
         })
          
        }
        
      })
      
  }
  
  ngOnChanges(changes: SimpleChanges): void {
      
  }

  /*
  
  */
  deletarItem(id: number): void{
    let itensFiltrados = []
    itensFiltrados = this.pedido.itens.filter(item => Number(item.id) != id)
    this.pedido.itens = itensFiltrados
    if(confirm("Remover do carrinho ?")){
      this.service.updatePedido(this.pedido).subscribe(pedido => {
        this.pedido = pedido
        this.itens = pedido.itens
        this.service.atualizarQuantidade(pedido.itens.length);
        this.snack.open("Item removido", "X", {duration: 2000})
        this.router.navigate(['/index', {id: this.idUser}])
      })
    }else{
      return
    }
    
  }

  limparCarrinho(): void{
    if(Number(this.pedido.id) > 0){
      if(confirm("Realmente deseja limpar o carrinho ?")){
        this.serviceCli.deletarPedido(Number(this.cliente.id)).subscribe(msg => {
          this.service.atualizarQuantidade(0);
          this.snack.open(msg.mensagem, "X", {duration: 3000})
        })
        this.router.navigate(['/index', {id: this.idUser}])
      }else{
        return;
      }
    }
  }
  continuarCompra(): void{
    this.router.navigate(['/index', {id: this.idUser}])
  }
  finalizarPedido(): void{
    if(Number(this.pedido.id) > 0){
      if(confirm("Finalizar Compra ?")){
        this.serviceCli.deletarPedido(Number(this.cliente.id)).subscribe(msg => {
          this.service.atualizarQuantidade(0);
          this.snack.open(msg.mensagem, "X", {duration: 3000})
        })
        this.router.navigate(['/index', {id: this.idUser}])
      }else{
        return;
      }
    }
  }
  checkPedido():void {
    if(Number(this.pedido.id) > 0){
      this.pedidoFinalizar = true;
    }
  }
  cancel(): void{
    this.pedidoFinalizar = false;
  }
}

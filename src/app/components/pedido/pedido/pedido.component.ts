import { Usuario } from './../../../models/Usuario.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/Cliente.model';
import { Pedido } from 'src/app/models/Pedido.model';

import { CarrinhoService } from 'src/app/service/service-carrinho-compra/carrinho.service';
import { UsuarioService } from 'src/app/service/service-user/usuario.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit{
  constructor(private service: CarrinhoService, private serviceUser: UsuarioService, private snack: MatSnackBar){}

  displayedColumns: string[] = ['id', 'cliente', 'endereco', 'data pedido', 'produto', 'preço produto', 'total', 'acoes'];
  dataSource:  MatTableDataSource<Cliente> =  new MatTableDataSource<Cliente>();
  clientes: Cliente[] = []
  pedidos: Pedido[] = []

  ngOnInit(): void {
      this.serviceUser.findAll().subscribe(users => {
        
       users.forEach(user => {this.clientes.push(user.cliente)})
       
       
       this.dataSource = new MatTableDataSource<Cliente>(this.clientes)
       this.clientes.shift()
       
      })
      this.service.getPedidos().subscribe(pedido => {
        this.pedidos = pedido
       
      })
  }
  removerPedido(idPedido: number | null | undefined): void{
    if(confirm("Remover Pedido ?")){
      this.service.deletarPedido(Number(idPedido)).subscribe(msg => {
        this.snack.open(msg.mensagem, "X", {duration: 2000})
      })
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
}

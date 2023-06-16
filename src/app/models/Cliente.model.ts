import { Pedido } from "./Pedido.model";
import { Usuario } from "./Usuario.model";

export interface Cliente{
    id?: null;
    nome: string;
    dataNascimento: null;
    cpf: string;
    telefone: string;
    endereco: string;
    cep: string;
    pedidos: Pedido[];
}
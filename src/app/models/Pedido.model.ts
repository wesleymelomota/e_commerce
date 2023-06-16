import { Cliente } from "./Cliente.model";
import { Item } from "./Item.model";

export interface Pedido{
    id?: null;
    dataCompra: null | string;
    total: null | number;
    status?: null | string;
    itens: Item[];
    // cliente: Cliente
}
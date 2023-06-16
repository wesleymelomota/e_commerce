import { Produto } from "./Produto.model";

export interface Item {
    id?: null;
    quantidade: null | number;
    preco: null;
    produto: Produto;
}
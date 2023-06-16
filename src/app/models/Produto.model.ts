import { Categoria } from "./Categoria.model";

export interface Produto{
    id?: null;
    nome: string;
    preco: null;
    descricao: string;
    promocao: boolean;
    categoria: Categoria;
    urlImagem: string;
}
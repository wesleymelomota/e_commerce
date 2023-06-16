import { Cliente } from "./Cliente.model";
import { Role } from "./Role.model";

export interface Usuario{
    id?: null;
    name: string;
    username: string;
    password: string;
    email: string;
    role: Role;
    cliente: Cliente;
}
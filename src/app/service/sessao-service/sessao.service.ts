import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  private token: string = ''
  private idUser: number = 0
  private perfil: string = '';

  constructor() { }
  setPerfil(perfil: string): void{
    this.perfil = perfil;
  }
  getPerfil(): string {
    return this.perfil;
  }
  setToken(token: string): void {
    this.token = token;
  }
  setIdUser(id: number): void{
    this.idUser = id;
  }
  getToken(): string {
    return this.token;
  }
  getIdUser(): number{
    return this.idUser;
  }
  
}

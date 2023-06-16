import {inject} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './auth.service'
import { SessaoService } from '../service/sessao-service/sessao.service';

export const authGuardAdmin = () => {
    const service = inject(SessaoService);
    const router = inject(Router);
    
    /*if(authService.isLoggedIn){
        return true;
    }*/
    if(sessionStorage.getItem("token") != null && sessionStorage.getItem("perfil") == "ADMIN"){
        return true;
    }
    return router.parseUrl("/login");
}
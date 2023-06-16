import {inject} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './auth.service'

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    /*if(authService.isLoggedIn){
        return true;
    }*/
    if(sessionStorage.getItem("token") != null){
        return true;
    }
    return router.parseUrl("/login");
}
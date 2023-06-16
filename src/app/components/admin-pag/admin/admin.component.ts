import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessaoService } from 'src/app/service/sessao-service/sessao.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor(private sessao: SessaoService, private router: Router){}
  ngOnInit(): void {
    
  }
  /**
   * 
   */
  logout(): void{
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }
}

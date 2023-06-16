import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/app/models/Email.dto.model';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  private emailFrom = "dev.wesley.melo0701@gmail.com"
  private baseUrl = "http://localhost:8080/send-email"
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `auth`
    })
  };
  
  sendEmailConfirmProduct(email: Email): Observable<Email>{
    email.emailFrom = this.emailFrom;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `${sessionStorage.getItem("token")}`)
    return this.http.post<Email>(`${this.baseUrl}`, email, this.httpOptions); //implemetar o headers
  }
  sendEmail(email: Email): Observable<Email>{
    //email.emailTo = this.emailTo;
    return this.http.post<Email>(`${this.baseUrl}`, email); //implemetar o headers
  }
}

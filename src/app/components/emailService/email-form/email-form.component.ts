import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Email } from 'src/app/models/Email.dto.model';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
  /*standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf],*/
})
export class EmailFormComponent {

  constructor(private service: EmailService){}
  //email = new FormControl('', [Validators.required, Validators.email]);
  emailDto: Email = {
    ownerRef: '',
    emailFrom: '',
    emailTo: '',
    subject: '',
    text: ''
  }

  sendEmail(): void{
    this.service.sendEmail(this.emailDto).subscribe(
      email => {
        email
      }
    )
  }
  /*getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }*/
}

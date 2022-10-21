import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  user = {
    "email": "f@f.com",
    "email_confirmation": "f@f.com",
    "username": "frangdelsolar",
    "first_name": "Francisco",
    "last_name": "Gonzalez",
    "password": "1234",
    "password_confirmation": "1234"
}
  
  form!: FormGroup;
  email = new FormControl('', [Validators.required]);
  email_confirmation = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  first_name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  password_confirmation = new FormControl('', [Validators.required]);
  
  markAllAsDirty = markAllAsDirty;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private authSvc: AuthService
  ) {
    this.form = fb.group({
      email: this.email,
      email_confirmation: this.email_confirmation,
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
      password_confirmation: this.password_confirmation,
    })
   }

  ngOnInit(): void {
  }

  validateForm(){
    let valid = true;
    if (!this.form.valid){
      this.markAllAsDirty(this.form);
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que falta completar algo.'});
      valid = false
    }

    if (this.form.controls['password'].value != this.form.controls['password_confirmation'].value){
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Las contraseñas no coinciden.'});
      this.form.controls['email'].markAsDirty();
      this.form.controls['email_confirmation'].markAsDirty();
      if (valid){
        valid = false;
      }
    }

    if (this.form.controls['email'].value != this.form.controls['email_confirmation'].value){
      this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Los correos electrónicos no coinciden.'});
      this.form.controls['password'].markAsDirty();
      this.form.controls['password_confirmation'].markAsDirty();
      if (valid){
        valid = false;
      }
    }

    return valid;
  }

  onUsernameChange(){
    return this.authSvc.isValidUsername(this.form.controls['username'].value).subscribe(
      (res: any)=>{
        if (res.valid_username){
        } else {
          this.messageService.add({severity:'error', summary:'Algo anda mal', detail: "Nombre de usuario invalido"});
        }
      },
      (err)=>{
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.detail});
      }
    )
  }

  onRegister(){
      if (this.validateForm()){
        this.authSvc.register(this.form.value).subscribe(
          (res)=>{
            localStorage.setItem('access', res.access);
            localStorage.setItem('refresh', res.refresh);
            this.router.navigate(['iniciar-sesion/']);
          },
          (err)=>{
            this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.detail});
          }
        )
      } 
  }



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { markAllAsDirty } from '@core/utils/markFieldsAsDirty';
import { MessageService } from 'primeng/api';
import { tap, exhaustMap, map, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  
  form!: FormGroup;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  markAllAsDirty = markAllAsDirty;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private authSvc: AuthService
  ) {
    this.form = fb.group({
      username: this.username,
      password: this.password,
    })
   }

  ngOnInit(): void {
  }

  loginGoogle(){
    this.authSvc.googleLogin().subscribe(res=>{
      console.log(res)
    })
  }

  onLogin(){
      if (this.form.valid){
        this.authSvc.auth(this.form.value).subscribe(
          (res)=>{
            this.authSvc.login(res)
            window.location.href = '/';
             
          },
          (err)=>{
            this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.detail});
          }
        )
      } else {
        this.markAllAsDirty(this.form);
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: 'Parece que falta completar algo.'});
      }
  }
}



import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authSvc: AuthService, private router: Router ){}

  canActivate(): Observable<boolean> | boolean {
    let auth =  this.authSvc.isAuth();
    if (auth){
        return true;      
    } else {
        this.router.navigateByUrl('/iniciar-sesion');
        return false;
    }
  }
}
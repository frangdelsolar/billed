import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@core/models/user.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  urlApiLogin = environment.apiUrlLogin;
  apiUrlUser = environment.apiUrlUser;
   

  private isAuthenticated = false;

  constructor(private http: HttpClient) { 

  }

  isValidUsername(username: string){
    let body = {
      username: username
    }
    return this.http.post(this.apiUrlUser + '/valid/', body);
  }

  auth(user: User): Observable<any> {
    const body = {
      username: user.username,
      password: user.password,
    };
    return this.http.post(this.urlApiLogin + '/', body);
  }

  isAuth(){
    return this.isAuthenticated;
  }

  login(){
    this.isAuthenticated = true;
  }

  logout(){
    this.isAuthenticated = false;
    localStorage.clear();
  }

  register(newUser: User): Observable<any> {
    return this.http.post(this.apiUrlUser+ '/', newUser);
  }

}
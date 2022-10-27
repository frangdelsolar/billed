import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@core/models/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  urlApiLogin = environment.apiUrlLogin;
  apiUrlUser = environment.apiUrlUser;
   

  public isAuthenticated = false;

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) { 

  }

  googleLogin(): Observable<firebase.auth.UserCredential>{
    return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
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
    let access = localStorage.getItem('access');
    if (access){
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  login(res: any){
    this.isAuthenticated = true;
    localStorage.setItem('access', res.access);
    localStorage.setItem('refresh', res.refresh);
  }

  logout(){
    this.isAuthenticated = false;
    localStorage.clear();
    window.location.reload();
  }

  register(newUser: User): Observable<any> {
    return this.http.post(this.apiUrlUser+ '/', newUser);
  }

}
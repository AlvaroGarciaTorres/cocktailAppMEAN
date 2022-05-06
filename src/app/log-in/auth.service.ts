import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  logInChanged = new Subject<boolean>();
  errorChanged = new Subject<string>();

  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit(){
  }

  logIn(username, password){
    this.http.post(`${environment.API_URL}auth/signin`, { username: username, password: password }).subscribe(
      (resp) =>{
          this.isAuthenticated = true;
          this.router.navigate(['cocktails']);
      },
      (error) => {
          this.isAuthenticated = false;
          this.errorChanged.next(error.error.message);
      },
      () => {
        this.logInChanged.next(this.isAuthenticated);
      }
    )   
  }

  signUp(username, email, password){
    this.http.post(`${environment.API_URL}auth/signup`, { username: username, email: email, password: password }).subscribe(
      (resp) =>{   
          console.log(resp);
          this.router.navigate(['logIn']);
      },
      (error) => {
          this.errorChanged.next(error.error.message);
      }
    )   
  }

  logOut(){
    this.isAuthenticated = false;
    this.logInChanged.next(this.isAuthenticated);
    this.router.navigate(['cocktails']);
  }
  
}

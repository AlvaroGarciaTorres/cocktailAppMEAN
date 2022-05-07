import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { openSnackBar } from '../shared/utilities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = true;
  userId: string;
  accessToken: string;
  logInChanged = new Subject<boolean>();
  errorChanged = new Subject<string>();

  constructor(private router: Router,
              private http: HttpClient,
              private _snackBar: MatSnackBar) { }

  ngOnInit(){
  }

  logIn(username, password){
    this.http.post(`${environment.API_URL}auth/signin`, { username: username, password: password }).subscribe(
      (resp) =>{
          console.log(resp)
          this.isAuthenticated = true;
          this.userId = resp['id'];
          this.accessToken = resp['accessToken'];
          openSnackBar(this._snackBar, "Log in succesfull", "OK");
          this.router.navigate(['cocktails']);
          this.errorChanged.next("");
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
          openSnackBar(this._snackBar, "Sign up succesfull", "OK");
          this.errorChanged.next("");
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

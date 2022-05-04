import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = true;
  logInChanged = new Subject<boolean>();
  logInErrorChanged = new Subject<boolean>();

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
          this.logInErrorChanged.next(true);
      }
    )

  }

  logOut(){
    this.isAuthenticated = false;
    this.logInChanged.next(this.isAuthenticated);
  }
  
}

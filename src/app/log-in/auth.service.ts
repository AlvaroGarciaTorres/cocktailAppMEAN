import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = true;
  logInChanged = new Subject<boolean>();

  constructor(private router: Router) { }

  ngOnInit(){
  }

  logIn(){
    this.isAuthenticated = true;
    this.logInChanged.next(this.isAuthenticated);
  }

  logOut(){
    this.isAuthenticated = false;
    this.logInChanged.next(this.isAuthenticated);
  }
  
}

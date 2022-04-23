import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  isLogged = true;
  logInChanged = new Subject<boolean>();

  constructor(private router: Router) { }

  ngOnInit(){
  }

  logIn(){
    this.isLogged = true;
    this.logInChanged.next(this.isLogged);
  }

  logOut(){
    this.isLogged = false;
    this.logInChanged.next(this.isLogged);
  }
  
}

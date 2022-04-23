import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogInService } from '../log-in/log-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean;
  logInStateSubscription: Subscription;

  constructor(private logInService: LogInService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.logInService.isLogged;
    this.logInStateSubscription = this.logInService.logInChanged
      .subscribe(
        (responseData) => this.isLogged = responseData
      )
  }

  onCLick(){
    this.isLogged ? this.logInService.logOut() : this.router.navigate(["logIn"]);;
  }

  ngOnDestroy(){
    this.logInStateSubscription.unsubscribe();
  }
}

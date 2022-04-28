import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../log-in/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  logInStateSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.logInStateSubscription = this.authService.logInChanged
      .subscribe(
        (responseData) => this.isAuthenticated = responseData
      )
  }

  onCLick(){
    this.isAuthenticated ? this.authService.logOut() : this.router.navigate(["logIn"]);;
  }

  ngOnDestroy(){
    this.logInStateSubscription.unsubscribe();
  }
}

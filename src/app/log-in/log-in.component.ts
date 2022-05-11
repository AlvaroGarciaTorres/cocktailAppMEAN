import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  errorSubscription: Subscription;

  error: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.errorSubscription = this.authService.errorChanged.subscribe(
      (error) => {
        this.error = error;
      }
    )

    this.signInForm = new FormGroup({
      "username": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, Validators.required)
    })
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
  }

  onSubmit(){
    let username = this.signInForm.controls['username'].value;
    let password = this.signInForm.controls['password'].value;
    this.authService.logIn(username, password);
  }

  onSignUp(){
    this.router.navigate(['signUp']);
  }

}

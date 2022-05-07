import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../log-in/auth.service';
import { getErrorMessage } from '../shared/utilities';

@Component({
  selector: 'app-sig-up',
  templateUrl: './sig-up.component.html',
  styleUrls: ['./sig-up.component.scss']
})
export class SigUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  errorSubscription: Subscription;
  signUpError: string;

  //Validators options
  forbiddenUsernames = ['admin', 'root'];
  emailErrorOptions = [
    { type: 'required', message: 'Enter your email' },
    { type: 'email', message: 'Invalid email' }
  ];
  usernameErrorOptions = [
    { type: 'required', message: 'Enter your username' },
    { type: 'invalidUsername', message: 'Forbidden username' }
  ];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, this.authErrorValidator.bind(this)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, Validators.required)
    })

    this.errorSubscription = this.authService.errorChanged.subscribe(
      (error) => {
        this.signUpError = error;
      } 
    )
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
  }

  onSubmit(){
    let username = this.signUpForm.controls['username'].value;
    let email = this.signUpForm.controls['email'].value;
    let password = this.signUpForm.controls['password'].value;
    this.authService.signUp(username, email, password);
  }

  onLogIn(){
    this.router.navigate(['logIn']);
  }

  authErrorValidator(control: FormControl): {[s:string]: boolean}{
    if(control.value !== null){
      if(this.forbiddenUsernames.indexOf(control.value.toLowerCase()) > -1) return {"invalidUsername": true};
    }     
    return null;
  }

  getError(formControlName: string, errorOptions: {type: string, message: string}[]): string {
    return getErrorMessage( this.signUpForm, formControlName, errorOptions);
  }
}

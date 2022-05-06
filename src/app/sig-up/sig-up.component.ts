import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../log-in/auth.service';

@Component({
  selector: 'app-sig-up',
  templateUrl: './sig-up.component.html',
  styleUrls: ['./sig-up.component.scss']
})
export class SigUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  forbiddenUsernames = ['admin', 'root'];
  errorSubscription: Subscription;
  signUpError: string;
  emailErrors = ['required', 'email'];
  emailMessages = ["Enter your email", "Invalid email"];
  usernameErrors = ['required', 'invalidUsername'];
  usernameMessages = ["Enter your username", "Forbidden username"];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, this.authError.bind(this)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, Validators.required)
    })

    this.errorSubscription = this.authService.errorChanged.subscribe(
      (error) => this.signUpError = error
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

  authError(control: FormControl): {[s:string]: boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) > -1) return {"invalidUsername": true};
    return null;
  }

  getErrorMessage(formControlName: string, errorsName: string[], errorMessages: string[]): string{
    const form: FormControl = (this.signUpForm.get(formControlName) as FormControl);
    if(errorsName.length === errorMessages.length){
      for(let i = 0; i< errorsName.length; i++){
        if(form.hasError(errorsName[i])) return errorMessages[i];
      }
    }
    return "Invalid";
  }
}

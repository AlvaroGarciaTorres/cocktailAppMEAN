import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  error: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.logInErrorChanged.subscribe(
      (error) => {
        this.error = error;
        console.log(this.error)
      }
    )
  }

  onLogIn(e){
    e.preventDefault();
    this.authService.logIn(this.username.nativeElement.value, this.password.nativeElement.value);
  }

}

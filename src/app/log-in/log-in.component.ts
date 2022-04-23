import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from './log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private logInService: LogInService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogIn(){
    this.logInService.logIn();
    this.router.navigate(["/cocktails"]);
  }

}

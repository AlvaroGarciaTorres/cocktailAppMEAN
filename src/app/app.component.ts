import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cocktailsRecipesMean';
  departments: [];

  constructor(private http: HttpClient) { }

  ngOnInit(){
    //this.initDept();
  }

  initDept(){
    this.http.get<any>(environment.API_URL + 'department')
    .subscribe(
      responseData => {
        this.departments = responseData;
        console.log(this.departments)
      },
      error => console.log(error)
    );
    this.http.post(environment.API_URL + 'department', { "DepartmentName": "new"})
    .subscribe(
      (response) => {
        console.log(response);
        console.log(this.departments)
      }
    );
    this.http.put(environment.API_URL + 'department', {"DepartmentId": 4, "DepartmentName": "PBO9"})
    .subscribe(
      (response) => {
        console.log(response);
        console.log(this.departments)
      }
    );
    this.http.delete(environment.API_URL + "department/4")
    .subscribe(
      (response) => {
        console.log(response);
        console.log(this.departments)
      }
    )
  }
}

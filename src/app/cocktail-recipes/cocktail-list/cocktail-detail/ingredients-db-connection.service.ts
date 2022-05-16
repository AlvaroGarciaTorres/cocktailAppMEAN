import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientsDbConnectionService {

  constructor(private http: HttpClient) { }

  getIngredientName(id: String){
    return this.http.get(`${environment.API_URL}ingredients/${id}`);
  }
}

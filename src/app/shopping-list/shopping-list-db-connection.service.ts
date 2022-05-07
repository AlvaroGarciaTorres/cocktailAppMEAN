import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListDbConnectionService {

  constructor(private http: HttpClient) { }

  fetchShoppingList(id: String){
    return this.http.get(`${environment.API_URL}shoppingList/${id}`);
  }

  updateShoppingList(id: String, body: { ingredientName: String, disabled: boolean }[]){
    console.log(body)
    this.http.put(`${environment.API_URL}shoppingList/${id}`, { shoppingList: body }).subscribe(
      (resp) => console.log(resp)
    )
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingList: string[] = [];

  constructor() { }

  addToShoppingList(ingredients: string[]){
    for(let ingredient of ingredients){
      this.shoppingList.push(ingredient[1]);
    }
    console.log(this.shoppingList)
  }

}

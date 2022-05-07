import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../log-in/auth.service';
import { ShoppingListDbConnectionService } from './shopping-list-db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingList: { ingredientName: string, disabled: boolean }[] = [];
  shoppingListChanged = new Subject<{ ingredientName: string, disabled: boolean }[]>();

  constructor(private shoppingListDbConnectionService: ShoppingListDbConnectionService,
              private authService: AuthService) { }

  fetchShoppingList(){
    return this.shoppingListDbConnectionService.fetchShoppingList(this.authService.userId);
  }

  updateShoppingList(){
    this.shoppingListDbConnectionService.updateShoppingList(this.authService.userId, this.shoppingList);
  }

  getShoppingList(){
    if(this.authService.logInChanged){
      this.shoppingList = [];
    }
    return this.shoppingList;
  }

  addToShoppingList(ingredients: string[]){
    for(let ingredient of ingredients){
      let ingredientName = ingredient[1];
      if(this.checkIngredientsAreNotRepeated(ingredientName)){
        this.shoppingList.push({ ingredientName: ingredientName, disabled: true });
      }      
    }
    this.shoppingListChanged.next(this.shoppingList);
  }

  checkIngredientsAreNotRepeated(ingredientName: string){
    return !this.shoppingList.filter(ingredient => ingredient.ingredientName == ingredientName).length     
  }

}

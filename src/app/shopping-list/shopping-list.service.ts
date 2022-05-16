import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../log-in/auth.service';
import { ShoppingListDbConnectionService } from './shopping-list-db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingList: { ingredientId: String, disabled: boolean }[] = [];
  shoppingListChanged = new Subject<{ ingredientId: String, disabled: boolean }[]>();
  fetched: boolean = false;
  fetchedChanged = new Subject<boolean>();

  constructor(private shoppingListDbConnectionService: ShoppingListDbConnectionService,
              private authService: AuthService) {
                this.authService.logInChanged.subscribe(
                  () => this.shoppingList = []
                )
              }

  fetchShoppingList(){
    return this.shoppingListDbConnectionService.fetchShoppingList(this.authService.userId);
  }

  updateShoppingList(shoppingList: { ingredientId: String, disabled: boolean }[]){
    this.shoppingList = shoppingList;
    this.shoppingListDbConnectionService.updateShoppingList(this.authService.userId, this.shoppingList);
  }

  getShoppingList(){
    if(!this.shoppingList.length){
      this.fetchShoppingList().subscribe(
        () => {
          this.fetched = true;
          this.fetchedChanged.next(this.fetched);
          return;
        } 
      )
    }
    return this.shoppingList;
  }

  addToShoppingList(ingredients: String[]){
    for(let ingredient of ingredients){
      if(this.checkIngredientsAreNotRepeated(ingredient)){
        this.shoppingList.push({ ingredientId: ingredient, disabled: true });
      }      
    }
    this.updateShoppingList(this.shoppingList);
  }

  checkIngredientsAreNotRepeated(ingredient: String){
    return !this.shoppingList.filter(ing => ing.ingredientId == ingredient).length     
  }

}

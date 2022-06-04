import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientsService } from '../cocktail-recipes/cocktail-list/cocktail-detail/ingredients.service';
import { AuthService } from '../log-in/auth.service';
import { ShoppingListDbConnectionService } from './shopping-list-db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingList: { _id: String, disabled: boolean }[] = [];
  ingredientNames: { _id: String, name: String, disabled: boolean }[] = [];
  shoppingListChanged = new Subject<{ _id: String, disabled: boolean }[]>();
  ingredientNamesChanged = new Subject<{ _id: String, name: String, disabled: boolean }[]>();
  fetched: boolean = false;
  fetchedChanged = new Subject<boolean>();

  constructor(private shoppingListDbConnectionService: ShoppingListDbConnectionService,
              private authService: AuthService,
              private ingredientService: IngredientsService) {
                this.authService.logInChanged.subscribe(
                  () => this.shoppingList = []
                )
              }

  fetchShoppingList(){
    this.ingredientNames = [];
    this.shoppingListDbConnectionService.fetchShoppingList(this.authService.userId).subscribe(
      (data) => {
        this.shoppingList = data['shoppingList'];
        data['shoppingList'].map(ing => {
          this.ingredientService.getIngredientName(ing._id).subscribe(
            (data) => {
              this.ingredientNames.push({_id: ing._id,name: data[0].strIngredient, disabled: ing.disabled});
              this.ingredientNamesChanged.next(this.ingredientNames);
            }
          );
        })
        this.fetched = true;
        this.fetchedChanged.next(this.fetched);
        this.ingredientNamesChanged.next(this.ingredientNames);
      }
    );
  }

  updateShoppingList(shoppingList: { _id: String, disabled: boolean }[]){
    this.shoppingListDbConnectionService.updateShoppingList(this.authService.userId, shoppingList);
  }

  getShoppingList(){
    return this.ingredientNames;
  }

  addToShoppingList(ingredients: String[]){
    this.fetched = false;
    for(let ingredient of ingredients){
      let ingredientName: String;
      if(this.checkIngredientsAreNotRepeated(ingredient)){
        this.shoppingList.push({ _id: ingredient, disabled: true }); 
    
      }      
    }
    this.shoppingListChanged.next(this.shoppingList);
    this.updateShoppingList(this.shoppingList);  
  }

  checkIngredientsAreNotRepeated(ingredient: String){
    return !this.ingredientNames.filter(ing => ing._id == ingredient).length     
  }

}

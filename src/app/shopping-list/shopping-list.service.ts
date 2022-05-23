import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientsService } from '../cocktail-recipes/cocktail-list/cocktail-detail/ingredients.service';
import { AuthService } from '../log-in/auth.service';
import { ShoppingListDbConnectionService } from './shopping-list-db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingList: { _id: String, disabled: boolean }[];
  ingredientNames: { name: String, disabled: boolean }[] = [];
  shoppingListChanged = new Subject<{ name: String, disabled: boolean }[]>();
  fetched: boolean;
  fetchedChanged = new Subject<boolean>();

  constructor(private shoppingListDbConnectionService: ShoppingListDbConnectionService,
              private authService: AuthService,
              private ingredientService: IngredientsService) {
                this.authService.logInChanged.subscribe(
                  () => this.shoppingList = []
                )
              }

  fetchShoppingList(){
    console.log("fetching")
    this.shoppingListDbConnectionService.fetchShoppingList(this.authService.userId).subscribe(
      (data) => {
        this.shoppingList = data['shoppingList'].map(ing => {
          this.ingredientService.getIngredientName(ing._id).subscribe(
            (data) => {
              console.log(ing.disabled)
              this.ingredientNames.push({name: data[0].strIngredient, disabled: ing.disabled})
            }
          );
        })
        this.fetchedChanged.next(true);
        this.shoppingListChanged.next(this.ingredientNames);
      }
    );
  }

  updateShoppingList(shoppingList: { name: String, disabled: boolean }[]){
    this.ingredientNames = shoppingList;
    //this.shoppingListDbConnectionService.updateShoppingList(this.authService.userId, this.shoppingList);
  }

  getShoppingList(){
    if(!this.shoppingList.length){
      this.fetchShoppingList();      
    }
    return this.ingredientNames;
  }

  addToShoppingList(ingredients: String[]){
    for(let ingredient of ingredients){
      if(this.checkIngredientsAreNotRepeated(ingredient)){
        this.shoppingList.push({ _id: ingredient, disabled: true });
      }      
    }
    this.shoppingListChanged.next(this.ingredientNames);
    this.updateShoppingList(this.ingredientNames);
  }

  checkIngredientsAreNotRepeated(ingredient: String){
    return !this.shoppingList.filter(ing => ing._id == ingredient).length     
  }

}

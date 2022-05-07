import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: { ingredientName: String, disabled: boolean}[];
  shoppingListSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    if(!this.shoppingListService.getShoppingList().length){
      this.shoppingListService.fetchShoppingList().subscribe(
        (data) => {
          data['shoppingList'].map(ingredient => this.shoppingList.push(ingredient))
        }
      )
    }

    this.shoppingList = this.shoppingListService.getShoppingList();
    this.shoppingListSubscription = this.shoppingListService.shoppingListChanged.subscribe(
      (shoppingList) => this.shoppingList = shoppingList
    )
  }

  ngOnDestroy(){
    this.shoppingListSubscription.unsubscribe();
  }

  onDisableIngredient(event, i){
    this.shoppingList[i].disabled = !this.shoppingList[i].disabled;
    console.log(this.shoppingList[i])
  }

  onSaveShoppingList(){
    this.shoppingListService.updateShoppingList();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { deleteAlert } from '../shared/utilities';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { IngredientsService } from '../cocktail-recipes/cocktail-list/cocktail-detail/ingredients.service';

const DELETE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>`

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: { _id: String, name: String, disabled: boolean}[] = [];
  shoppingListSubscription: Subscription;
  fetchedSubscription: Subscription;
  isLoading: boolean;

  //Spinner config
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 100;

  constructor(private shoppingListService: ShoppingListService,
              private iconRegistry: MatIconRegistry, 
              private sanitizer: DomSanitizer,
              private ingredientService: IngredientsService) {
                iconRegistry.addSvgIconLiteral('trash-can', sanitizer.bypassSecurityTrustHtml(DELETE_ICON));
              }

  ngOnInit(): void {
    this.isLoading = !this.shoppingListService.fetched;
    this.fetchedSubscription = this.shoppingListService.fetchedChanged.subscribe(
      (data) => {
        this.isLoading = !data;
      }  
    )

    if(this.isLoading){
      this.shoppingListService.fetchShoppingList();
    }
    else{
      this.shoppingList = this.shoppingListService.getShoppingList();
    }

    this.shoppingListSubscription = this.shoppingListService.ingredientNamesChanged.subscribe(
      (shoppingList) =>{
        this.shoppingList = shoppingList;
        console.log(this.shoppingList);
      } 
    )
  }

  ngOnDestroy(){
    this.shoppingListSubscription.unsubscribe();
  }

  onDisableIngredient(i: number){
    this.shoppingList[i].disabled = !this.shoppingList[i].disabled;
    this.rearrangeShoppingList(i);
  }

  rearrangeShoppingList(i: number){
    let ingredientChanged = this.shoppingList[i];
    this.shoppingList.splice(i, 1);
    if(ingredientChanged.disabled){
      this.shoppingList.push(ingredientChanged);
    }else{
      this.shoppingList.unshift(ingredientChanged);
    }
  }

  onDeleteIngredient(index: number){
    deleteAlert(`You are about to delete '${this.shoppingList[index].name}' from your shopping list. Are you sure?`, () => this.deleteIngredient(index))
  }

  deleteIngredient(index: number){
    this.shoppingList.splice(index, 1);
    this.shoppingListService.shoppingListChanged.next(this.shoppingList);
    this.shoppingListService.updateShoppingList(this.shoppingList);
  }

  onDeleteAll(){
    deleteAlert('You are about to delete all the ingredients from your shopping list. Are you sure?', () => this.deleteAll())
  }

  deleteAll(){
    this.shoppingList = [];
    this.shoppingListService.shoppingListChanged.next(this.shoppingList);
    this.shoppingListService.updateShoppingList(this.shoppingList);
  }

  onToggleAll(boolean: boolean){   
    this.shoppingList.map(ingredient => ingredient.disabled = boolean);
    this.shoppingListService.shoppingListChanged.next(this.shoppingList);
  }
}

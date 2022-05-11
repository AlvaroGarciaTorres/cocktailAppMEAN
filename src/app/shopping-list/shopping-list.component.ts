import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert2';

const DELETE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>`

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: { ingredientName: String, disabled: boolean}[];
  shoppingListSubscription: Subscription;
  swalConfig = { 
    title: 'Delete', 
    text: 'You are about to delete all the ingredients from your shopping list. Are you sure?', 
    icon: 'warning',
    showConfirmButton: false,
    showDenyButton: true, 
    denyButtonText: 'DELETE', 
    showCancelButton: true,
    cancelButtonText: 'CANCEL' 
  }

  constructor(private shoppingListService: ShoppingListService,
              private iconRegistry: MatIconRegistry, 
              private sanitizer: DomSanitizer) {
                iconRegistry.addSvgIconLiteral('trash-can', sanitizer.bypassSecurityTrustHtml(DELETE_ICON));
              }

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
      (shoppingList) =>{
        this.shoppingList = shoppingList
      } 
    )
  }

  ngOnDestroy(){
    this.shoppingListService.updateShoppingList(this.shoppingList);
    this.shoppingListSubscription.unsubscribe();
  }

  onDisableIngredient(i: number){
    this.shoppingList[i].disabled = !this.shoppingList[i].disabled;
    this.rearrangeShoppingList(i);
  }

  rearrangeShoppingList(i){
    let ingredientChanged = this.shoppingList[i];
    this.shoppingList.splice(i, 1);
    if(ingredientChanged.disabled){
      this.shoppingList.push(ingredientChanged);
    }else{
      this.shoppingList.unshift(ingredientChanged);
    }
  }

  onDeleteIngredient(ingredientName){
    this.deleteAlert(`You are about to delete '${ingredientName}' from your shopping list. Are you sure?`, () => this.deleteIngredient(ingredientName))
  }

  deleteIngredient(ingredientName: String){
    this.shoppingList = this.shoppingList.filter(ingredient => ingredient.ingredientName !== ingredientName)
    this.shoppingListService.shoppingListChanged.next(this.shoppingList);
  }

  onDeleteAll(){
    this.deleteAlert('You are about to delete all the ingredients from your shopping list. Are you sure?', () => this.deleteAll())
  }

  deleteAll(){
    this.shoppingList = [];
    this.shoppingListService.shoppingListChanged.next(this.shoppingList);

  }

  onToggleAll(boolean: boolean){   
    this.shoppingList.map(ingredient => ingredient.disabled = boolean);
    this.shoppingListService.shoppingListChanged.next(this.shoppingList);
  }



  deleteAlert(message: string, cbk: Function){
    swal.fire({
      title: 'Delete?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'DELETE',
      cancelButtonText: 'CANCEL'
    }).then(
      (result) => {
        if(result.isConfirmed) {
          cbk();
        }
      }
    )
  }

}

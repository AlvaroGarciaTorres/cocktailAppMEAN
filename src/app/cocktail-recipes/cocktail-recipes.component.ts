import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Cocktail } from './cocktail-list/cocktail-item/cocktail.model';
import { CocktailsDbApiService } from './cocktails-db-api-service';

@Component({
  selector: 'app-cocktail-recipes',
  templateUrl: './cocktail-recipes.component.html',
  styleUrls: ['./cocktail-recipes.component.scss']
})
export class CocktailRecipesComponent{
  showSelectedCocktail: boolean = false;
  updateSticky: Subject<boolean> = new Subject();
  updateMethod(){
    this.updateSticky.next(true);
  }

  onCocktailChanged(isChanged: boolean){
    this.showSelectedCocktail = isChanged;
  }
}

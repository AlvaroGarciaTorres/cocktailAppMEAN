import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cocktail } from './cocktail-list/cocktail-item/cocktail.model';
import { CocktailsDbApiService } from './cocktails-db-api-service';

@Injectable({
  providedIn: 'root'
})
export class CoktailRecipesService {
  cocktailList: Cocktail[] = [];
  fetched: boolean = false;
  fetchedChanged = new Subject<boolean>();
  cocktailListChanged = new Subject<Cocktail[]>();

  constructor(private cocktailDbService: CocktailsDbApiService) { }

  fetchRecipes(){
    this.cocktailDbService.fetchCocktails().subscribe(
      (cocktailList: Cocktail[]) => {
        this.fetched = true;
        this.fetchedChanged.next(this.fetched);
        this.cocktailList = cocktailList;  
        this.cocktailListChanged.next(this.cocktailList);    
      }
    )
  }

  getRecipes(){
    if(!this.fetched){
      this.fetchRecipes();
    }
    return this.cocktailList;   
  }
}

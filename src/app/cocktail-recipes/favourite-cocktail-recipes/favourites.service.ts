import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/log-in/auth.service';
import { Cocktail } from '../cocktail-list/cocktail-item/cocktail.model';
import { CocktailsDbApiService } from '../cocktails-db-api-service';
import { FavouritesDbConnectionService } from './favourites-db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favouritesList: Cocktail[] = [];

  constructor(private favouritesDbService: FavouritesDbConnectionService,
              private cocktailRecipesService: CocktailsDbApiService,
              private authService: AuthService) { }

  fetchFavouritesList(){
    this.favouritesDbService.fetchFavouritesList(this.authService.userId).subscribe(
      (cocktailsIds) => {
        this.getCoktailsInfo(cocktailsIds['favourites']);
      }
    );
  }

  getCoktailsInfo(cocktailsIds: String[]){
    if(this.cocktailRecipesService.cocktailList.length){
      this.getList(cocktailsIds, this.cocktailRecipesService.cocktailList)
    } else {
      this.cocktailRecipesService.fetchCocktails().subscribe(
        (respCocktailsList) => this.getList(cocktailsIds, respCocktailsList)
      )
    }
  }

  getList(cocktailsIds: String[], cocktailsList: Cocktail[]){
    for(let item of cocktailsIds){
      let cocktail: Cocktail[] = cocktailsList.filter(cocktail => cocktail._id === item);
      this.favouritesList.push(cocktail[0]);
    }

    return this.favouritesList;
  }

  getFavouritesList(){
    return this.favouritesList;
  }

  updateFavouritesList(cocktailId: String){
    return this.favouritesDbService.updateFavouritesList(this.authService.userId, cocktailId);
  }
}

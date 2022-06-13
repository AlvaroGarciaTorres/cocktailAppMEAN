import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/log-in/auth.service';
import { Cocktail } from '../cocktail-list/cocktail-item/cocktail.model';
import { FavouritesDbConnectionService } from './favourites-db-connection.service';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { OK_CONFIRMATION_MESSAGE, FAVOURITES_CONFIRMATION_MESSAGE, openSnackBar } from 'src/app/shared/snackBar';
import { CoktailRecipesService } from '../coktail-recipes.service';

const STAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/></svg>`

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  cocktailsChanged = new Subject<Cocktail[]>();
  favouritesList: Cocktail[] = [];
  fetched: boolean = false;
  favouritesChanged = new Subject<Cocktail[]>();
  fetchedChanged = new Subject<boolean>();

  constructor(private favouritesDbService: FavouritesDbConnectionService,
              private cocktailRecipesService: CoktailRecipesService,
              private authService: AuthService,
              private  iconRegistry: MatIconRegistry, 
              private sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar,) { 
                iconRegistry.addSvgIconLiteral('star', sanitizer.bypassSecurityTrustHtml(STAR_ICON));
              }

  fetchFavouritesList(){
    return this.favouritesDbService.getFavouritesListFromDb(this.authService.userId);
  }

  getCoktailsInfo(cocktailsIds: String[]){
    if(this.cocktailRecipesService.fetched){
      this.getList(cocktailsIds, this.cocktailRecipesService.cocktailList)
    } else {
      this.cocktailRecipesService.getRecipes();
      this.cocktailRecipesService.cocktailListChanged.subscribe(
        (respCocktailsList) => {
          this.getList(cocktailsIds, respCocktailsList);
        }
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
    if(!this.fetched){
      this.favouritesList = [];
      this.fetchFavouritesList().subscribe(
        (cocktailsIds) => {
          this.fetched = true;
          this.fetchedChanged.next(this.fetched);
          this.getCoktailsInfo(cocktailsIds['favourites']);
          // return;
        }
      );
    }
    return this.favouritesList;
  }

  updateFavouritesListById(cocktail: Cocktail){
    this.favouritesDbService.updateFavouritesListById(this.authService.userId, cocktail._id).subscribe(
      () => {
        this.favouritesList.push(cocktail);
        this.favouritesChanged.next(this.favouritesList);
        openSnackBar(this._snackBar, FAVOURITES_CONFIRMATION_MESSAGE, OK_CONFIRMATION_MESSAGE);
      },
      (err) => {
        openSnackBar(this._snackBar, err.error.message, OK_CONFIRMATION_MESSAGE)
      }  
    )
  }

  updateFavourites(favouritesList: Cocktail[]){
    return this.favouritesDbService.updateFavouritesList(this.authService.userId, favouritesList).subscribe(
      () => {
        this.favouritesList = favouritesList;
        this.favouritesChanged.next(favouritesList)
      }
    )
  }
}

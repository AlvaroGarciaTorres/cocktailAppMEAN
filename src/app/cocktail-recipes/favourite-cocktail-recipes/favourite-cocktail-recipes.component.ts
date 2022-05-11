import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { Cocktail } from '../cocktail-list/cocktail-item/cocktail.model';
import { CocktailRecipesComponent } from '../cocktail-recipes.component';
import { CoktailRecipesService } from '../coktail-recipes.service';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'app-favourite-cocktail-recipes',
  templateUrl: './favourite-cocktail-recipes.component.html',
  styleUrls: ['./favourite-cocktail-recipes.component.scss']
})
export class FavouriteCocktailRecipesComponent implements OnInit, OnDestroy {
  favouritesSubscription: Subscription;
  fetchedSubscription: Subscription;
  isLoading: boolean = true;
  favouriteCocktails: Cocktail[] = [];

  //Spinner config
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 100;

  constructor(private favouritesService: FavouritesService,
              private cocktailService: CoktailRecipesService) { }

  ngOnInit(): void {
    if(!this.favouritesService.getFavouritesList().length)
    {
      this.favouritesService.fetchFavouritesList();
    }

    this.isLoading = !this.cocktailService.fetched;
    this.fetchedSubscription = this.cocktailService.fetchedChanged.subscribe(
      (fetched: boolean) => this.isLoading = !fetched
    )
    
    this.favouriteCocktails = this.favouritesService.getFavouritesList();
    this.favouritesSubscription = this.favouritesService.favouritesChanged.subscribe(
      (favouritesList) => this.favouriteCocktails = favouritesList
    )
  }

  ngOnDestroy(){
    this.favouritesService.updateFavourites(this.favouriteCocktails);
    this.favouritesSubscription.unsubscribe();
    this.fetchedSubscription.unsubscribe();
  }

  onDelete(cocktail: Cocktail){
    this.favouriteCocktails = this.favouriteCocktails.filter(cocktailItem => cocktailItem._id !== cocktail._id)
  }

}

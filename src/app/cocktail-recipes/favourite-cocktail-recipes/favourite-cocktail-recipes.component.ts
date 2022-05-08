import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../cocktail-list/cocktail-item/cocktail.model';
import { CocktailsDbApiService } from '../cocktails-db-api-service';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'app-favourite-cocktail-recipes',
  templateUrl: './favourite-cocktail-recipes.component.html',
  styleUrls: ['./favourite-cocktail-recipes.component.scss']
})
export class FavouriteCocktailRecipesComponent implements OnInit {

  favouriteCocktails: Cocktail[] = [];

  constructor(private favouritesService: FavouritesService) { }

  ngOnInit(): void {
    this.favouritesService.fetchFavouritesList();
    this.favouriteCocktails = this.favouritesService.getFavouritesList();
  }

}

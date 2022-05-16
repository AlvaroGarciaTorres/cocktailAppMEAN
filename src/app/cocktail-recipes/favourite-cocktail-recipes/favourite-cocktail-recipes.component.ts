import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/log-in/auth.service';
import { deleteAlert } from 'src/app/shared/utilities';
import { Cocktail } from '../cocktail-list/cocktail-item/cocktail.model';
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
  selectedCocktail: Cocktail;
  tagList: String[] = [];

  //Spinner config
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 100;

  constructor(private favouritesService: FavouritesService,
              private cocktailService: CoktailRecipesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logInChanged.subscribe(
      () => {
        this.favouritesService.fetched = false;
      }
    )

    this.isLoading = !this.cocktailService.fetched;
    this.fetchedSubscription = this.cocktailService.fetchedChanged.subscribe(
      (fetched: boolean) => {
        this.isLoading = !fetched;
      }
    )
    
    this.favouriteCocktails = this.favouritesService.getFavouritesList();
    this.favouritesSubscription = this.favouritesService.favouritesChanged.subscribe(
      (favouritesList) => {
        this.favouriteCocktails = favouritesList;
      }
    )

    this.selectedCocktail = this.favouriteCocktails[this.activatedRoute.snapshot.queryParamMap.get('cocktail')];

    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        this.selectedCocktail = this.favouriteCocktails[params.get('cocktail')];

        this.tagList = [];

        if(!this.selectedCocktail){
          return;
        }

        if(this.selectedCocktail.strTags != undefined || this.selectedCocktail.strTags != null){
          this.tagList = this.selectedCocktail.strTags.split(",");
          return;
        }

        return;
      }
    );
  }

  ngOnDestroy(){
    this.favouritesService.updateFavourites(this.favouriteCocktails);
    this.favouritesSubscription.unsubscribe();
    this.fetchedSubscription.unsubscribe();
    this.favouriteCocktails = [];
  }

  onDelete(cocktail: Cocktail){
    deleteAlert(`Do you want to delete '${cocktail.strDrink}' from your favourit list?`, () => {
      this.favouriteCocktails = this.favouriteCocktails.filter(cocktailItem => cocktailItem._id !== cocktail._id)
    })
  }

  onView(cocktail: Cocktail, i: number){
    console.log(this.favouriteCocktails)
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { cocktail: i } })
  }

  onClose(e){
    if(e.target.className === "modal-bg" || e.target.innerHTML === "close".toUpperCase()){
      this.selectedCocktail = null;
      this.router.navigate(['favourites']);
    }
  }

}

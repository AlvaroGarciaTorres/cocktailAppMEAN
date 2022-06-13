import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CoktailRecipesService } from '../coktail-recipes.service';
import { Subscription } from 'rxjs';
import { Cocktail } from './cocktail-item/cocktail.model';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit, OnDestroy {
  cocktailList = [];
  isLoading: boolean = true;
  cocktailRecipesSubscription: Subscription;
  fetchedSubscription: Subscription;
  @Output() cocktailChanged = new EventEmitter<boolean>();

  //Spinner config
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 100;

  constructor(private cocktailService: CoktailRecipesService,
              private router: Router) { }

  ngOnInit(){
    this.cocktailList = this.cocktailService.getRecipes();
    this.isLoading = !this.cocktailService.fetched;
    this.cocktailRecipesSubscription = this.cocktailService.cocktailListChanged.subscribe(
      (cocktaiLList: Cocktail[]) => this.cocktailList = cocktaiLList
    );

    this.fetchedSubscription = this.cocktailService.fetchedChanged.subscribe(
      (fetched: boolean) => this.isLoading = !fetched
    )
  }

  ngOnDestroy(){
    this.cocktailRecipesSubscription.unsubscribe();
    this.fetchedSubscription.unsubscribe();
  }

  onSelectCocktail(id: number){
    this.router.navigate(["/cocktails", id]);
    this.cocktailChanged.emit(true);
  }
}

import { Component, OnInit } from '@angular/core';
import { Cocktail } from './cocktail-item/cocktail.model';
import { CocktailsDbApiService } from '../cocktails-db-api-service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {
  cocktailList: Cocktail[] = [];
  isLoading: boolean = true;

  constructor(private cocktailsDbApiService: CocktailsDbApiService,
              private router: Router,
              /*private route: Route*/) { }

  ngOnInit(): void {
    if(!this.cocktailsDbApiService.fetched){
      this.cocktailsDbApiService.fetchCocktails().then((response => {  
        this.cocktailList = response;
        this.isLoading = false;
      }))         
    }
    else{
      this.isLoading = false;
      this.cocktailList = this.cocktailsDbApiService.getCocktailList();
    }
  }

  onSelectCocktail(id){
    this.router.navigate(["/cocktails", id])
  }
}

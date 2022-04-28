import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cocktail } from './cocktail-item/cocktail.model';
import { CocktailsDbApiService } from '../cocktails-db-api-service';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {
  cocktailList = [];
  isLoading: boolean = true;
  @Output() cocktailChanged = new EventEmitter<boolean>();

  constructor(private cocktailsDbApiService: CocktailsDbApiService,
              private router: Router
              /*private route: Route*/) { }

  ngOnInit(): void {
    if(!this.cocktailsDbApiService.fetched){
//      this.cocktailsDbApiService.fetchCocktails().then((response => {  
      this.cocktailsDbApiService.fetchCocktails().subscribe((response => {
        this.cocktailList = response;
        console.log(this.cocktailList[0])
        this.cocktailsDbApiService.cocktailList = response;
        this.isLoading = false;
      }))         
    }
    else{
      this.isLoading = false;
      this.cocktailList = this.cocktailsDbApiService.getCocktailList();
    }
  }

  onSelectCocktail(id: number){
    this.router.navigate(["/cocktails", id]);
    this.cocktailChanged.emit(true);
  }
}

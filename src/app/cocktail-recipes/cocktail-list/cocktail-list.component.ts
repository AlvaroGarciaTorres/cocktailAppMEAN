import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CocktailsDbApiService } from '../cocktails-db-api-service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {
  cocktailList = [];
  isLoading: boolean = true;
  @Output() cocktailChanged = new EventEmitter<boolean>();

  //Spinner config
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 100;

  constructor(private cocktailsDbApiService: CocktailsDbApiService,
              private router: Router) { }

  ngOnInit(): void {
    if(!this.cocktailsDbApiService.fetched){ 
      this.cocktailsDbApiService.fetchCocktails().subscribe((response => {
        this.cocktailList = response.slice(0, 10);
        //console.log(this.cocktailList[0])
        console.log(this.cocktailList)
        this.cocktailsDbApiService.cocktailList = response;
        this.isLoading = false;
      }))         
    }
    else{
      this.isLoading = false;
      this.cocktailList = this.cocktailsDbApiService.getCocktailList().slice(0, 10);
    }
  }

  onSelectCocktail(id: number){
    this.router.navigate(["/cocktails", id]);
    this.cocktailChanged.emit(true);
  }
}

import { Injectable } from '@angular/core';
import { Cocktail } from './cocktail-list/cocktail-item/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsDbApiService {
  cocktailListLength: number = 2;
  cocktailList: Cocktail[] = [];
  fetched: boolean = false;

  constructor() { }

  getAllCocktails(){
    let promises = [];
    for(let i = 0; i < this.cocktailListLength; i++){
      promises.push(new Promise<Cocktail>((resolve,reject) => {
        this.getRandomCocktail()
        .then(response => response.json())
        .then(response =>{  
          this.cocktailList[i] = response.drinks[0];
          resolve(response.drinks[0]);
        })
        .catch(err => console.error(err));  
      }))
    }
    return Promise.all(promises);
  }

  fetchCocktails(){
    this.fetched = true;
    return this.getAllCocktails();
  }

  getCocktailList(){
    return this.cocktailList;
  }

  getRandomCocktail(){
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  }
}


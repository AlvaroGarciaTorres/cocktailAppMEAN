import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cocktail } from './cocktail-list/cocktail-item/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsDbApiService {
  cocktailListLength: number = 2;
  cocktailList: Cocktail[] = [];
  fetched: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getAllCocktails(){
    let promises = [];
    for(let i = 0; i < this.cocktailListLength; i++){
      promises.push(new Promise<Cocktail>((resolve,reject) => {
        this.getRandomCocktail()
        .then(response => response.json())
        .then(response =>{  
          this.cocktailList[i] = response.drinks[0];
          // this.httpClient.post(environment.API_URL + "cocktails", response.drinks[0])
          // .subscribe(
          //   (response) => console.log(response)
          // )
          resolve(response.drinks[0]);
        })
        .catch(err => console.error(err));  
      }))
    }
    return Promise.all(promises);
  }

  fetchCocktails(){
    this.fetched = true;
    //return this.getAllCocktails();
    return this.httpClient.get<any>(environment.API_URL + "cocktails")
  }

  getCocktailList(){
    return this.cocktailList;
  }

  getRandomCocktail(){
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  }
}


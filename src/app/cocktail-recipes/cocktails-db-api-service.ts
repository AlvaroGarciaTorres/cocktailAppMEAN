import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cocktail } from './cocktail-list/cocktail-item/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsDbApiService {
  cocktailListLength = 40;
  cocktailList: any[] = [];
  fetched: boolean = false;

  constructor() { }

  // ff(){
  //   let cocktails = new Promise<Cocktail[]>(
  //     (resolve, reject) => {
  //       let promise = new Promise((resolve,reject) => {
  //         for(let i = 0; i < 10; i++){ 
  //           this.getRandomCocktail()
  //           .then(response => response.json())
  //           .then(response =>{  
  //             this.cocktailList[i] = response.drinks[0];
  //           })
  //           .catch(err => console.error(err));            
  //         }
  //         resolve(this.cocktailList)  
  //       }).then((res) => {
  //         resolve(this.cocktailList)
  //       })        
  //     }
  //   )
  //   return cocktails;
  // }

  prueba(){
    let promises = [];
    for(let i = 0; i < this.cocktailListLength; i++){
      promises.push(new Promise((resolve,reject) => {
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
    // let cocktails = new Promise<Cocktail[]>(
      //(resolve, reject) => {
      //   for(let i = 0; i < this.cocktailListLength; i++){
      //     this.getRandomCocktail()
      //   }
        // this.ff().then((res) => {
        //   console.log(res)
        //   resolve(this.cocktailList)
        // })
      // }
    // )
    this.fetched = true;
    return this.prueba();
  }

  getCocktailList(){
    return this.cocktailList;
  }

  getRandomCocktail(){
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    // .then(response => response.json())
    //         .then(response =>{  
    //           this.cocktailList.push(response.drinks[0]);
    //         })
    //         .catch(err => console.error(err));
  }
}


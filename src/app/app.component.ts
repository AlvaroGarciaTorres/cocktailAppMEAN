import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cocktail } from './cocktail-recipes/cocktail-list/cocktail-item/cocktail.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(){
    //this.initIngredients();
    this.getAllCocktails().then(
      (resp) => {
        let cocktailArray = [];
        cocktailArray = [resp][0];
        console.log(cocktailArray)
        for(let i = 0; i < cocktailArray.length; i++){
          let fields = Object.entries(cocktailArray[i]);
          let strIngredients = fields.filter(field => {
            return field[0].startsWith("strIng") && field[1] !== undefined && field[1] !== null;
          }).map(p => p[1]);
          let strIngredientsMeasures = fields.filter(field => field[0].startsWith("strMeas") && field[1] !== undefined && field[1] !== null)
          .map(p => p[1]);

          delete cocktailArray[i].strIngredient1;
          delete cocktailArray[i].strIngredient2;
          delete cocktailArray[i].strIngredient3;
          delete cocktailArray[i].strIngredient4;
          delete cocktailArray[i].strIngredient5;
          delete cocktailArray[i].strIngredient6;
          delete cocktailArray[i].strIngredient7;
          delete cocktailArray[i].strIngredient8;
          delete cocktailArray[i].strIngredient9;
          delete cocktailArray[i].strIngredient10;
          delete cocktailArray[i].strIngredient11;
          delete cocktailArray[i].strIngredient12;
          delete cocktailArray[i].strIngredient13;
          delete cocktailArray[i].strIngredient14;
          delete cocktailArray[i].strIngredient15;

          delete cocktailArray[i].strMeasure1;
          delete cocktailArray[i].strMeasure2;
          delete cocktailArray[i].strMeasure3;
          delete cocktailArray[i].strMeasure4;
          delete cocktailArray[i].strMeasure5;
          delete cocktailArray[i].strMeasure6;
          delete cocktailArray[i].strMeasure7;
          delete cocktailArray[i].strMeasure8;
          delete cocktailArray[i].strMeasure9;
          delete cocktailArray[i].strMeasure10;
          delete cocktailArray[i].strMeasure11;
          delete cocktailArray[i].strMeasure12;
          delete cocktailArray[i].strMeasure13;
          delete cocktailArray[i].strMeasure14;
          delete cocktailArray[i].strMeasure15;
          
          cocktailArray[i].strIngredients = strIngredients;
          cocktailArray[i].strIngredientsMeasures = strIngredientsMeasures;

        }
        console.log(resp)
        //Aquí hacer el post
      }
    )
  }

  initIngredients(){
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .subscribe(
      (resp) => {
        resp['drinks'].map(p => {
          p.strIngredient = p.strIngredient1;
          delete p.strIngredient1;
        })
        this.http.post(`${environment.API_URL}ingredients/createMany`, resp['drinks']).subscribe(
          (resp) => {

            console.log(resp);
          }
        )
      }
    )
  }

  getRandomCocktail(){
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  }

  getAllCocktails(){
    let promises = [];
    for(let i = 0; i < 2; i++){
      promises.push(new Promise<Cocktail>((resolve,reject) => {
        this.getRandomCocktail()
        .then(response => response.json())
        .then(response =>{  
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

}

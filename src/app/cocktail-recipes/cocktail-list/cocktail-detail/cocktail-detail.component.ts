import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CocktailsDbApiService } from '../../cocktails-db-api-service';
import { Cocktail } from '../cocktail-item/cocktail.model';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {
  //isCocktailSelected: boolean = false;
  cocktail: Cocktail;
  cocktailIngredients;
  ingredientsMeasures;

  constructor(private route: ActivatedRoute,
              private cocktailDbApiService: CocktailsDbApiService) { }

  ngOnInit(): void {
    //this.cocktail = this.cocktailDbApiService.cocktailList[this.route.snapshot.params['id']];
    this.route.params.subscribe(
      (params) => {
        this.cocktail = this.cocktailDbApiService.cocktailList[params['id']];
        console.log(this.cocktail)
        let fields = Object.entries(this.cocktail);
        console.log(this.cocktail)
        this.cocktailIngredients = fields.filter(field => field[0].startsWith("strIng") && field[1] !== undefined && field[1] !== null && field[1].length > 0);
        this.ingredientsMeasures = fields.filter(field => field[0].startsWith("strMeas") && field[1] !== undefined && field[1] !== null && field[1].length > 0); 
        console.log(this.ingredientsMeasures)
      }
    )
  }

}

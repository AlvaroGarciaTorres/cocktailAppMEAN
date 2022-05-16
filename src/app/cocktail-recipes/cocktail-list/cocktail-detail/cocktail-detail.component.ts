import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/log-in/auth.service';
import { openSnackBar } from 'src/app/shared/utilities';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { CocktailsDbApiService } from '../../cocktails-db-api-service';
import { CoktailRecipesService } from '../../coktail-recipes.service';
import { Cocktail } from '../cocktail-item/cocktail.model';
import { IngredientsService } from './ingredients.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {
  cocktail: Cocktail;
  cocktailIngredients;
  cocktailIngredientsNames: String[];
  ingredientsMeasures;
  ingredientsChanged = new Subject<String[]>();

  constructor(private route: ActivatedRoute,
              private cocktailService: CoktailRecipesService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private ingredientsService: IngredientsService) { }

  ngOnInit(): void {
    //this.cocktail = this.cocktailDbApiService.cocktailList[this.route.snapshot.params['id']];
    this.route.params.subscribe(
      (params) => {
        this.cocktail = this.cocktailService.cocktailList[params['id']];
        this.cocktailIngredientsNames = []
        this.cocktailIngredients = this.cocktail.strIngredients;
        this.ingredientsMeasures = this.cocktail.strIngredientsMeasures;
        //sacar el nombre del ingrediente a partir del id
        this.cocktailIngredients.map(ingredient => {
          this.ingredientsService.getIngredientName(ingredient).subscribe(
            (data) => {
              ingredient = data[0].strIngredient;
              this.cocktailIngredientsNames.push(ingredient)
              this.ingredientsChanged.next(this.cocktailIngredientsNames);
            }
          )
        })
      }
    )
  }

  onAddToShoppingList(){
    if(this.authService.isAuthenticated){
      //console.log(this.cocktailIngredients)
      this.shoppingListService.addToShoppingList(this.cocktailIngredients);
      openSnackBar(this._snackBar, "Added to your shopping list", "OK");
    } else {
      openSnackBar(this._snackBar, "You need to log in first", "OK");
    }  
  }
}

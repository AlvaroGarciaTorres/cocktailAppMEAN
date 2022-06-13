import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/log-in/auth.service';
import { ADDED_TO_SHOPPING_LIST_MESSAGE, LOG_IN_FIRST_MESSAGE, OK_CONFIRMATION_MESSAGE, openSnackBar } from 'src/app/shared/snackBar';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
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
    this.route.params.subscribe(
      (params) => {
        this.cocktail = this.cocktailService.cocktailList[params['id']];
        this.cocktailIngredientsNames = []
        this.cocktailIngredients = this.cocktail.strIngredients;
        this.ingredientsMeasures = this.cocktail.strIngredientsMeasures;
        //Get the ingredient name from its id
        this.cocktailIngredients.map(ingredient => {
          this.ingredientsService.getIngredientName(ingredient).subscribe(
            (data) => {
              this.cocktailIngredientsNames.push(data[0].strIngredient)
              this.ingredientsChanged.next(this.cocktailIngredientsNames);
            }
          )
        })
      }
    )
  }

  onAddToShoppingList(){
    console.log(this.cocktailIngredients)
    if(this.authService.isAuthenticated){
      this.shoppingListService.addToShoppingList(this.cocktailIngredients);
      openSnackBar(this._snackBar, ADDED_TO_SHOPPING_LIST_MESSAGE, OK_CONFIRMATION_MESSAGE);
    } else {
      openSnackBar(this._snackBar, LOG_IN_FIRST_MESSAGE, OK_CONFIRMATION_MESSAGE);
    }  
  }
}

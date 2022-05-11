import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/log-in/auth.service';
import { openSnackBar } from 'src/app/shared/utilities';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { CocktailsDbApiService } from '../../cocktails-db-api-service';
import { CoktailRecipesService } from '../../coktail-recipes.service';
import { Cocktail } from '../cocktail-item/cocktail.model';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {
  cocktail: Cocktail;
  cocktailIngredients;
  ingredientsMeasures;

  constructor(private route: ActivatedRoute,
              private cocktailService: CoktailRecipesService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //this.cocktail = this.cocktailDbApiService.cocktailList[this.route.snapshot.params['id']];
    this.route.params.subscribe(
      (params) => {
        this.cocktail = this.cocktailService.cocktailList[params['id']];
        let fields = Object.entries(this.cocktail);
        this.cocktailIngredients = fields.filter(field => field[0].startsWith("strIng") && field[1] !== undefined && field[1] !== null && field[1].length > 0);
        this.ingredientsMeasures = fields.filter(field => field[0].startsWith("strMeas") && field[1] !== undefined && field[1] !== null && field[1].length > 0); 
      }
    )
  }

  onAddToShoppingList(){
    if(this.authService.isAuthenticated){
      this.shoppingListService.addToShoppingList(this.cocktailIngredients);
      openSnackBar(this._snackBar, "Added to your shopping list", "OK");
    } else {
      openSnackBar(this._snackBar, "You need to log in first", "OK");
    }  
  }
}

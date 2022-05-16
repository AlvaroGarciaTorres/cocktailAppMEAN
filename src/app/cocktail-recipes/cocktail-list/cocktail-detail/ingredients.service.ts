import { Injectable } from '@angular/core';
import { IngredientsDbConnectionService } from './ingredients-db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private ingredientDbService: IngredientsDbConnectionService) { }

  getIngredientName(id: String){
    return this.ingredientDbService.getIngredientName(id);
  }
}

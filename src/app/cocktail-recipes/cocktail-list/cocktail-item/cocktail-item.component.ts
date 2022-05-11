import { Component, Input, OnInit } from '@angular/core';
import { FavouritesService } from '../../favourite-cocktail-recipes/favourites.service';
import { Cocktail } from './cocktail.model';

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.scss']
})
export class CocktailItemComponent implements OnInit {
  @Input() index: number;
  @Input() cocktail: Cocktail;

  constructor(private favouritesService: FavouritesService) { }

  ngOnInit(): void {
  }

  onFavourite(){
    this.favouritesService.updateFavouritesListById(this.cocktail);
  }

}

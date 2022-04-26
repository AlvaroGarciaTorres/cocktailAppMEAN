import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Cocktail } from './cocktail.model';

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.scss']
})
export class CocktailItemComponent implements OnInit {
  @Input() index: number;
  @Input() cocktail: Cocktail;

  constructor() { }

  ngOnInit(): void {
  }

  onViewDetail(){
    
  }

}

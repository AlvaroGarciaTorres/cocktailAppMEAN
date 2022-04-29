import { Component, ElementRef, HostBinding, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { Options } from '@popperjs/core/lib/modifiers/flip';

@Component({
  selector: 'app-cocktail-recipes',
  templateUrl: './cocktail-recipes.component.html',
  styleUrls: ['./cocktail-recipes.component.scss']
})
export class CocktailRecipesComponent{
  showSelectedCocktail: boolean = false;
  @ViewChild('leftDiv') leftDiv: ElementRef;
  @HostBinding('style.backgroundColor') backgroundColor: string = 'white';
  @HostBinding('style.transition') transition: string = 'background-color 3s';

  constructor(private renderer: Renderer2){}

  @HostListener('window:scroll', ['$event'])onScroll(eventData: Event){
    if(this.leftDiv !== undefined){
      if(window.pageYOffset > 40){
        this.leftDiv.nativeElement.classList.add("stick-to-top");
        this.leftDiv.nativeElement.classList.remove("back-to-start");
        this.backgroundColor = 'rgb(231, 226, 226)';
      }
      else{
        this.leftDiv.nativeElement.classList.add("back-to-start");
        this.leftDiv.nativeElement.classList.remove("stick-to-top");
        this.backgroundColor = 'transparent';
      }
    }
  }

  onCocktailChanged(isChanged: boolean){
    this.showSelectedCocktail = isChanged;
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { openSnackBar } from 'src/app/shared/utilities';
import { FavouritesDbConnectionService } from '../../favourite-cocktail-recipes/favourites-db-connection.service';
import { FavouritesService } from '../../favourite-cocktail-recipes/favourites.service';
import { Cocktail } from './cocktail.model';

const STAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/></svg>`

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.scss']
})
export class CocktailItemComponent implements OnInit {
  @Input() index: number;
  @Input() cocktail;

  

  constructor(private  iconRegistry: MatIconRegistry, 
              private sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar,
              private favouritesService: FavouritesService) {
                iconRegistry.addSvgIconLiteral('star', sanitizer.bypassSecurityTrustHtml(STAR_ICON));

              }

  ngOnInit(): void {
  }

  onFavourite(){
    this.favouritesService.updateFavouritesList(this.cocktail._id).subscribe(
      (resp) => openSnackBar(this._snackBar, "Cocktail added to favourites", "OK"),
      (error) => console.log(error)
    );
    
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CocktailRecipesComponent } from './cocktail-recipes/cocktail-recipes.component';
import { CocktailListComponent } from './cocktail-recipes/cocktail-list/cocktail-list.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { CocktailItemComponent } from './cocktail-recipes/cocktail-list/cocktail-item/cocktail-item.component';
import { AuthService } from './log-in/auth.service';
import { MatCardModule } from '@angular/material/card';
import { FavouriteCocktailRecipesComponent } from './cocktail-recipes/favourite-cocktail-recipes/favourite-cocktail-recipes.component';
import { CocktailDetailComponent } from './cocktail-recipes/cocktail-list/cocktail-detail/cocktail-detail.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { SigUpComponent } from './sig-up/sig-up.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FavouritesService } from './cocktail-recipes/favourite-cocktail-recipes/favourites.service';
import { CoktailRecipesService } from './cocktail-recipes/coktail-recipes.service';

@NgModule({
  declarations: [
    AppComponent,
    CocktailRecipesComponent,
    CocktailListComponent,
    HeaderComponent,
    ShoppingListComponent,
    LogInComponent,
    CocktailItemComponent,
    FavouriteCocktailRecipesComponent,
    CocktailDetailComponent,
    SigUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [AuthService, CoktailRecipesService, AuthGuardService, ShoppingListService, FavouritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

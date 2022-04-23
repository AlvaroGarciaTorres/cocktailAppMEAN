import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './account/account.component';
import { CocktailRecipesComponent } from './cocktail-recipes/cocktail-recipes.component';
import { CocktailListComponent } from './cocktail-recipes/cocktail-list/cocktail-list.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { CocktailItemComponent } from './cocktail-recipes/cocktail-list/cocktail-item/cocktail-item.component';
import { LogInService } from './log-in/log-in.service';
import { CocktailsDbApiService } from './cocktail-recipes/cocktails-db-api-service';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    CocktailRecipesComponent,
    CocktailListComponent,
    HeaderComponent,
    ShoppingListComponent,
    LogInComponent,
    CocktailItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [LogInService, CocktailsDbApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

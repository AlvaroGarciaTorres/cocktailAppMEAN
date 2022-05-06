import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CocktailDetailComponent } from './cocktail-recipes/cocktail-list/cocktail-detail/cocktail-detail.component';
import { CocktailRecipesComponent } from './cocktail-recipes/cocktail-recipes.component';
import { FavouriteCocktailRecipesComponent } from './cocktail-recipes/favourite-cocktail-recipes/favourite-cocktail-recipes.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SigUpComponent } from './sig-up/sig-up.component';

const routes: Routes = [
  { path:"cocktails", component: CocktailRecipesComponent, children: [
    { path:":id", component: CocktailDetailComponent}
  ]},
  { path:"shopping-list", canActivate: [AuthGuardService], component: ShoppingListComponent},
  { path:"account", component: AccountComponent},
  { path:"logIn", component: LogInComponent},
  { path:"signUp", component: SigUpComponent},
  { path:"favourites", canActivate: [AuthGuardService], component: FavouriteCocktailRecipesComponent},
  { path: "**", redirectTo: "cocktails" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CocktailRecipesComponent } from './cocktail-recipes/cocktail-recipes.component';
import { LogInComponent } from './log-in/log-in.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path:"cocktails", component: CocktailRecipesComponent},
  { path:"shopping-list", component: ShoppingListComponent},
  { path:"account", component: AccountComponent},
  { path:"logIn", component: LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

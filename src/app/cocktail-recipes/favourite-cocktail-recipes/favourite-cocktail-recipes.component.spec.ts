import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteCocktailRecipesComponent } from './favourite-cocktail-recipes.component';

describe('FavouriteCocktailRecipesComponent', () => {
  let component: FavouriteCocktailRecipesComponent;
  let fixture: ComponentFixture<FavouriteCocktailRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteCocktailRecipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteCocktailRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

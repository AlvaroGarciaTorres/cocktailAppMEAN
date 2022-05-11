import { TestBed } from '@angular/core/testing';

import { CoktailRecipesService } from './coktail-recipes.service';

describe('CoktailRecipesService', () => {
  let service: CoktailRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoktailRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

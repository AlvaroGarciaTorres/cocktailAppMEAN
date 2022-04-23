import { TestBed } from '@angular/core/testing';

import { CocktailsDbApiService } from './cocktails-db-api-service';

describe('CocktailsDbApiServiceService', () => {
  let service: CocktailsDbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailsDbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

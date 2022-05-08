import { TestBed } from '@angular/core/testing';

import { FavouritesDbConnectionService } from './favourites-db-connection.service';

describe('FavouritesDbConnectionService', () => {
  let service: FavouritesDbConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesDbConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

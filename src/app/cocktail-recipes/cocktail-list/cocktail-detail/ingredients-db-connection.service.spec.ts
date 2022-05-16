import { TestBed } from '@angular/core/testing';

import { IngredientsDbConnectionService } from './ingredients-db-connection.service';

describe('IngredientsDbConnectionService', () => {
  let service: IngredientsDbConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsDbConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

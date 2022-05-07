import { TestBed } from '@angular/core/testing';

import { ShoppingListDbConnectionService } from './shopping-list-db-connection.service';

describe('ShoppingListDbConnectionService', () => {
  let service: ShoppingListDbConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListDbConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

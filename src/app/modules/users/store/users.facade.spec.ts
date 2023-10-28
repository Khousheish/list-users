import { TestBed } from '@angular/core/testing';

import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  let facade: UsersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    facade = TestBed.inject(UsersFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});

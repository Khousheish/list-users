import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { listUsersResolver } from './list-users.resolver';

describe('listUsersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => listUsersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

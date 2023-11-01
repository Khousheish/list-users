import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';

import { UsersFacade } from '@Modules/users/store/users.facade';
import { Spied } from '@Specs/utils.types';

import { listUsersResolver } from './list-users.resolver';

describe('listUsersResolver', () => {
  let mockedUsersFacade: Spied<UsersFacade>;
  const mockedRoute = <ActivatedRouteSnapshot>{};
  const pendingSubject = new BehaviorSubject<boolean>(false);

  beforeEach(() => {
    mockedUsersFacade = {
      ...jasmine.createSpyObj('UsersFacade', ['getUsers']),
      usersPending$: pendingSubject.asObservable(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: UsersFacade, useValue: mockedUsersFacade }],
    });
  });

  it('should call getUsers method of UsersFacade', fakeAsync(() => {
    const resolver = <Observable<boolean>>TestBed.runInInjectionContext(() => {
      return listUsersResolver(mockedRoute, <RouterStateSnapshot>{});
    });

    resolver.pipe(take(1)).subscribe(() => {});
    tick();

    expect(mockedUsersFacade.getUsers).toHaveBeenCalled();
  }));
});

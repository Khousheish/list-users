import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { MOCKED_USER } from '@Mocks/users.mocks';
import { Spied } from '@Specs/utils.types';

import { User } from '../shared/user.interface';

import { UsersActions } from './users.actions';
import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  let facade: UsersFacade;
  let mockedStore: Spied<Store>;

  beforeEach(() => {
    mockedStore = jasmine.createSpyObj(Store, ['dispatch', 'select']);
    TestBed.configureTestingModule({
      providers: [UsersFacade, { provide: Store, useValue: mockedStore }],
    });
    facade = TestBed.inject(UsersFacade);
  });

  describe('getUsers', (): void => {
    it('should dispatch getUsers action', (): void => {
      facade.getUsers();

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(UsersActions.getUsers());
    });
  });

  describe('addRandomUser', (): void => {
    it('should dispatch addRandomUser action', (): void => {
      const user: User = MOCKED_USER;
      facade.addRandomUser(user);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(UsersActions.addRandomUser({ user }));
    });
  });

  describe('addUserToFavorite', (): void => {
    it('should dispatch addUserToFavorite action', (): void => {
      const user: User = MOCKED_USER;
      facade.addUserToFavorite(user);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(UsersActions.addUserToFavorites({ user }));
    });
  });

  describe('removeUserFromFavorites', (): void => {
    it('should dispatch removeUserFromFavorites action', (): void => {
      const user: User = MOCKED_USER;
      facade.removeUserFromFavorites(user);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(UsersActions.removeUserFromFavorites({ user }));
    });
  });
});

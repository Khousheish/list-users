import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, take } from 'rxjs';

import { MOCKED_USER } from '@Mocks/users.mocks';
import { User } from '@Modules/users/shared/user.interface';
import { UsersFacade } from '@Modules/users/store/users.facade';
import { Spied } from '@Specs/utils.types';

import { FavoriteUsersComponent } from './favorite-users.component';

describe('FavoriteUsersComponent', () => {
  let component: FavoriteUsersComponent;
  let fixture: ComponentFixture<FavoriteUsersComponent>;
  let mockedUsersFacade: Spied<UsersFacade>;
  const favoriteUsersSubject = new BehaviorSubject<User[]>([]);
  const pendingSubject = new BehaviorSubject<boolean>(false);

  beforeEach(() => {
    mockedUsersFacade = {
      ...jasmine.createSpyObj('UsersFacade', ['removeUserFromFavorites', 'addUserToFavorite']),
      favoriteUsers$: favoriteUsersSubject.asObservable(),
      usersPending$: pendingSubject.asObservable(),
    };
    TestBed.configureTestingModule({
      imports: [FavoriteUsersComponent],
      providers: [{ provide: UsersFacade, useValue: mockedUsersFacade }],
    });

    fixture = TestBed.createComponent(FavoriteUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleFavorite', () => {
    it('should call addUserToFavorite when the user is not a favorite', () => {
      const user: User = MOCKED_USER;

      component.toggleFavorite(user);

      expect(mockedUsersFacade.addUserToFavorite).toHaveBeenCalledWith(user);
      expect(mockedUsersFacade.removeUserFromFavorites).not.toHaveBeenCalled();
    });

    it('should call removeUserFromFavorites when the user is a favorite', () => {
      const user: User = { ...MOCKED_USER, isFavorite: true };

      component.toggleFavorite(user);

      expect(mockedUsersFacade.removeUserFromFavorites).toHaveBeenCalledWith(user);
      expect(mockedUsersFacade.addUserToFavorite).not.toHaveBeenCalled();
    });
  });

  describe('favoriteUsers$', () => {
    it('should retrieve favorite users from the facade', (done: DoneFn) => {
      favoriteUsersSubject.next([MOCKED_USER]);

      component['favoriteUsers$'].pipe(take(1)).subscribe((users) => {
        expect(users).toEqual([MOCKED_USER]);

        done();
      });
      favoriteUsersSubject.next([]);
    });
  });

  describe('usersPending$', () => {
    it('should retrieve usersPending from the facade', (done: DoneFn) => {
      pendingSubject.next(true);

      component['usersPending$'].pipe(take(1)).subscribe((pending) => {
        expect(pending).toBeTrue();

        done();
      });
      pendingSubject.next(false);
    });
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject, take } from 'rxjs';

import { MOCKED_USER } from '@Mocks/users.mocks';
import { User } from '@Modules/users/shared/user.interface';
import { UsersFacade } from '@Modules/users/store/users.facade';
import { Spied } from '@Specs/utils.types';

import { ListUsersComponent } from './list-users.component';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let mockedUsersFacade: Spied<UsersFacade>;
  const usersSubject = new BehaviorSubject<User[]>([]);
  const pendingSubject = new BehaviorSubject<boolean>(false);

  beforeEach(() => {
    mockedUsersFacade = {
      ...jasmine.createSpyObj('UsersFacade', ['addRandomUser', 'removeUserFromFavorites', 'addUserToFavorite']),
      users$: usersSubject.asObservable(),
      usersPending$: pendingSubject.asObservable(),
    };

    TestBed.configureTestingModule({
      imports: [ListUsersComponent],
      providers: [{ provide: UsersFacade, useValue: mockedUsersFacade }],
    });

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
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

  describe('users$', () => {
    it('should retrieve users from the facade', (done: DoneFn) => {
      usersSubject.next([MOCKED_USER]);

      component['users$'].pipe(take(1)).subscribe((users) => {
        expect(users).toEqual([MOCKED_USER]);

        done();
      });
      usersSubject.next([]);
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

  describe('ngOnInit', () => {
    it('should call addRandomUser and detectChanges every 5 seconds', fakeAsync(() => {
      component.ngOnInit();
      tick(6000);

      expect(mockedUsersFacade.addRandomUser).toHaveBeenCalled();
      fixture.destroy();
    }));
  });
});

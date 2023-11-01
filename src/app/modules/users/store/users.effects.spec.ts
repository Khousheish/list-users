import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, Subject, of, take, throwError } from 'rxjs';

import { MOCKED_PAGINATED_USER_RESPONSE, MOCKED_USER } from '@Mocks/users.mocks';
import { Spied } from '@Specs/utils.types';

import { PaginatedUsersResponse, User } from '../shared/user.interface';
import { UsersRepository } from '../shared/users-repository';

import { UsersActions } from './users.actions';
import { UsersEffects } from './users.effects';
import { UsersFacade } from './users.facade';

describe('UsersEffects', () => {
  let effects: UsersEffects;
  let mockedUsersRepository: Spied<UsersRepository>;
  let mockedUsersFacade: Spied<UsersFacade>;
  let mockedMessageService: jasmine.SpyObj<MessageService>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actionsSubject: Subject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockedActions$: Observable<any>;
  const favoriteUsersSubject = new BehaviorSubject<User[]>([]);

  beforeEach(() => {
    actionsSubject = new Subject();
    mockedActions$ = actionsSubject.asObservable();

    mockedUsersRepository = jasmine.createSpyObj(UsersRepository, ['getUsers']);
    mockedUsersFacade = {
      ...jasmine.createSpyObj(UsersFacade, ['getUsers']),
      favoriteUsers$: favoriteUsersSubject.asObservable(),
    };
    mockedMessageService = jasmine.createSpyObj(MessageService, ['add']);

    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        {
          provide: Actions,
          useValue: mockedActions$,
        },
        {
          provide: UsersFacade,
          useValue: mockedUsersFacade,
        },
        {
          provide: MessageService,
          useValue: mockedMessageService,
        },
        {
          provide: UsersRepository,
          useValue: mockedUsersRepository,
        },
      ],
    });

    effects = TestBed.inject(UsersEffects);
  });

  it('should call getUsers and call getUsersSuccess', (done: DoneFn): void => {
    mockedUsersRepository.getUsers.and.returnValue(of(MOCKED_PAGINATED_USER_RESPONSE));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<Observable<PaginatedUsersResponse>>(<unknown>effects.getUsers$)).pipe(take(1)).subscribe((action: any): void => {
      expect(action.type).toEqual(UsersActions.getUsersSuccess.type);

      done();
    });

    actionsSubject.next(UsersActions.getUsers());

    expect(mockedUsersRepository.getUsers).toHaveBeenCalledTimes(1);
    expect(mockedUsersRepository.getUsers).toHaveBeenCalledWith();
  });

  it('should call getUsers and call getUsersFailure', (done: DoneFn): void => {
    mockedUsersRepository.getUsers.and.returnValue(throwError(() => new Error('error')));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<Observable<PaginatedUsersResponse>>(<unknown>effects.getUsers$)).pipe(take(1)).subscribe((action: any): void => {
      expect(action.type).toEqual(UsersActions.getUsersFailure.type);

      done();
    });

    actionsSubject.next(UsersActions.getUsers());
    expect(mockedUsersRepository.getUsers).toHaveBeenCalledTimes(1);
    expect(mockedUsersRepository.getUsers).toHaveBeenCalledWith();
  });

  it('should call addUserToFavorite and call addUserToFavoriteSuccess', (done: DoneFn): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<Observable<User>>(<unknown>effects.addUserToFavorites$))
      .pipe(take(1))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((action: any): void => {
        expect(action.type).toEqual(UsersActions.addUserToFavoritesSuccess.type);

        done();
      });

    actionsSubject.next(UsersActions.addUserToFavorites({ user: MOCKED_USER }));
  });

  it('should call addUserToFavorite and call addUserToFavoritesFailure', (done: DoneFn): void => {
    favoriteUsersSubject.next(
      new Array(10).fill(MOCKED_USER, 0, 10).map((user: User, index: number) => {
        return {
          ...user,
          id: index + 1,
        };
      }),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<Observable<User>>(<unknown>effects.addUserToFavorites$))
      .pipe(take(1))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((action: any): void => {
        expect(action.type).toEqual(UsersActions.addUserToFavoritesFailure.type);
        favoriteUsersSubject.next([]);

        done();
      });

    actionsSubject.next(UsersActions.addUserToFavorites({ user: MOCKED_USER }));
  });

  it('should show message to user that favorites limit reached', (done: DoneFn): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<Observable<void>>(<unknown>effects.addUserToFavoritesFailure$))
      .pipe(take(1))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((action: any): void => {
        expect(action.type).toEqual(UsersActions.addUserToFavoritesFailure.type);

        done();
      });
    actionsSubject.next(UsersActions.addUserToFavoritesFailure());

    expect(mockedMessageService.add).toHaveBeenCalledTimes(1);
  });
});

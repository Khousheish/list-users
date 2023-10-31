import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { PaginatedUsersResponse } from '../shared/user.interface';
import { UsersRepository } from '../shared/users-repository';

import { UsersActions } from './users.actions';
import { UsersFacade } from './users.facade';
@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(() => this.usersRepository.getUsers()),
      map(({ data }: PaginatedUsersResponse) => UsersActions.getUsersSuccess({ data })),
      catchError((error) => of(UsersActions.getUsersFailure({ error }))),
    ),
  );

  addUserToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUserToFavorites),
      withLatestFrom(this.usersFacade.favoriteUsers$),
      map(([action, favorites]) => {
        if (favorites.length < 10) {
          return UsersActions.addUserToFavoritesSuccess({ user: action.user });
        } else {
          return UsersActions.addUserToFavoritesFailure();
        }
      }),
    ),
  );

  addUserToFavoritesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.addUserToFavoritesFailure),
        tap(() => {
          this.messageService.add({
            key: 'globalToast',
            severity: 'error',
            summary: 'Error',
            detail:
              'Your favorites list has reached its limit of 10 items. Please remove an item before adding a new one.',
          });
        }),
      ),
    { dispatch: false },
  );
  constructor(
    private readonly actions$: Actions,
    private readonly usersRepository: UsersRepository,
    private readonly usersFacade: UsersFacade,
    private readonly messageService: MessageService,
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PaginatedUsersResponse } from '../shared/user.interface';
import { UsersRepository } from '../shared/users-repository';

import { UsersActions } from './users.actions';
@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(() => this.usersRepository.getUsers()),
      map(({ data }: PaginatedUsersResponse) => UsersActions.getUsersSuccess({ data })),
      catchError((error) => of(UsersActions.getUsersFailure({ error }))),
    );
  });
  constructor(
    private readonly actions$: Actions,
    private readonly usersRepository: UsersRepository,
  ) {}
}

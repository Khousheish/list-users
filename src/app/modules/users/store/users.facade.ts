import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../shared/user.interface';

import { UsersActions } from './users.actions';
import { selectFavorites, selectPending, selectUsers } from './users.reducer';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  users$: Observable<User[]> = this.store.select(selectUsers);
  favoriteUsers$: Observable<User[]> = this.store.select(selectFavorites);
  usersPending$: Observable<boolean> = this.store.select(selectPending);

  constructor(private readonly store: Store) {}

  getUsers(): void {
    this.store.dispatch(UsersActions.getUsers());
  }

  addRandomUser(user: User): void {
    this.store.dispatch(UsersActions.addRandomUser({ user }));
  }

  addUserToFavorite(user: User): void {
    this.store.dispatch(UsersActions.addUserToFavorites({ user }));
  }

  removeUserFromFavorites(user: User): void {
    this.store.dispatch(UsersActions.removeUserFromFavorites({ user }));
  }
}

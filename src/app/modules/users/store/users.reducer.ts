import { createFeature, createReducer, on } from '@ngrx/store';

import { User } from '../shared/user.interface';

import { UsersActions } from './users.actions';

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[];
  favorites: User[];
  pending: boolean;
}

export const initialState: UsersState = {
  users: [],
  favorites: [],
  pending: false,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.getUsers, (state) => ({
    ...state,
    pending: true,
  })),
  on(UsersActions.getUsersSuccess, (state, action) => {
    const updatedUsers = action.data.map((user) => {
      return {
        ...user,
        isFavorite: state.favorites.some((favorite) => favorite.id === user.id),
      };
    });

    return {
      ...state,
      pending: false,
      users: updatedUsers,
    };
  }),
  on(UsersActions.getUsersFailure, (state) => ({
    ...state,
    pending: false,
  })),
  on(UsersActions.addRandomUser, (state, action) => {
    const updatedUsers =
      state.users.length >= 10 ? [...state.users.slice(1), action.user] : [...state.users, action.user];

    return {
      ...state,
      pending: false,
      users: updatedUsers,
    };
  }),
  on(UsersActions.addUserToFavorites, (state, action) => {
    const updatedUsers = state.users.map((user) => {
      if (user.id === action.user.id) {
        return {
          ...user,
          isFavorite: true,
        };
      }
      return user;
    });

    return {
      ...state,
      users: updatedUsers,
      favorites: [...state.favorites, { ...action.user, isFavorite: true }],
    };
  }),
  on(UsersActions.removeUserFromFavorites, (state, action) => {
    const updatedUsers = state.users.map((user) => {
      if (user.id === action.user.id) {
        return {
          ...user,
          isFavorite: false,
        };
      }
      return user;
    });

    return {
      ...state,
      users: updatedUsers,
      favorites: state.favorites.filter((favorite) => favorite.id !== action.user.id),
    };
  }),
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer: usersReducer,
});

export const { name, reducer, selectFavorites, selectPending, selectUsers, selectUsersState } = usersFeature;

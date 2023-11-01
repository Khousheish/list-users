import { MOCKED_USER } from '@Mocks/users.mocks';

import { User } from '../shared/user.interface';

import { UsersActions } from './users.actions';
import { UsersState, initialState, usersReducer } from './users.reducer';

describe('Users Reducer', () => {
  describe('Request Actions', (): void => {
    it('should set state to initial state when passed state is undefined', (): void => {
      const undefinedState: UsersState | undefined = undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const state: UsersState = usersReducer(undefinedState, <any>'SOME_ACTION');

      expect(state).toBe(initialState);
    });

    it('getUsers should set pending to true', (): void => {
      const state: UsersState = usersReducer(initialState, UsersActions.getUsers());

      expect(state).not.toBe(initialState);
      expect(state).toEqual({
        ...initialState,
        pending: true,
      });
    });

    it('addUserToFavorites should set pending to true', (): void => {
      const state: UsersState = usersReducer(initialState, UsersActions.addUserToFavorites({ user: MOCKED_USER }));

      expect(state).not.toBe(initialState);
      expect(state).toEqual({
        ...initialState,
        pending: true,
      });
    });
  });

  describe('Success Actions', (): void => {
    const mockedUsers = new Array(10).fill(MOCKED_USER, 0, 10).map((user: User, index: number) => {
      return {
        ...user,
        id: index + 1,
      };
    });
    const mockedInitialState: UsersState = {
      pending: false,
      // Fill users object with 10 mocked users
      users: mockedUsers,
      favorites: [],
    };

    it('should set users', (): void => {
      const state: UsersState = usersReducer(initialState, UsersActions.getUsersSuccess({ data: [MOCKED_USER] }));

      expect(state).not.toBe(initialState);
      expect(state).toEqual({
        ...initialState,
        users: [MOCKED_USER],
        pending: false,
      });
    });

    it('should set users and mark any previously favorite users', (): void => {
      const mockedInitialState: UsersState = {
        pending: true,
        users: [],
        favorites: [MOCKED_USER].map((user) => ({
          ...user,
          isFavorite: true,
        })),
      };
      const mockedFavoriteUser = {
        ...MOCKED_USER,
        isFavorite: true,
      };
      const state: UsersState = usersReducer(mockedInitialState, UsersActions.getUsersSuccess({ data: [MOCKED_USER] }));

      expect(state).not.toBe(mockedInitialState);
      expect(state).toEqual({
        ...mockedInitialState,
        users: [mockedFavoriteUser],
        pending: false,
      });
    });

    it('should add random user', (): void => {
      const state: UsersState = usersReducer(initialState, UsersActions.addRandomUser({ user: MOCKED_USER }));

      expect(state).not.toBe(initialState);
      expect(state).toEqual({
        ...initialState,
        users: [MOCKED_USER],
        pending: false,
      });
    });

    it('should add random user and remove oldest user if number of users exceeds 10', (): void => {
      const state: UsersState = usersReducer(mockedInitialState, UsersActions.addRandomUser({ user: MOCKED_USER }));

      const updatedMockedUsers = [...mockedUsers.slice(1), MOCKED_USER];
      expect(state).not.toBe(mockedInitialState);
      expect(state).toEqual({
        ...mockedInitialState,
        users: updatedMockedUsers,
        pending: false,
      });
    });

    it('should add user to favorites', (): void => {
      const state: UsersState = usersReducer(
        mockedInitialState,
        UsersActions.addUserToFavoritesSuccess({ user: MOCKED_USER }),
      );

      expect(state).not.toBe(mockedInitialState);
      expect(state).toEqual({
        ...mockedInitialState,
        users: mockedUsers.map((user) => {
          if (user.id === MOCKED_USER.id) {
            return { ...MOCKED_USER, isFavorite: true };
          }
          return user;
        }),
        favorites: [{ ...MOCKED_USER, isFavorite: true }],
        pending: false,
      });
    });

    it('should remove user to favorites', (): void => {
      const mockedStateWithFavorite: UsersState = {
        ...mockedInitialState,
        favorites: [MOCKED_USER],
        users: mockedUsers.map((user) => {
          if (user.id === MOCKED_USER.id) {
            return { ...MOCKED_USER, isFavorite: true };
          }
          return user;
        }),
      };
      const state: UsersState = usersReducer(
        mockedStateWithFavorite,
        UsersActions.removeUserFromFavorites({ user: MOCKED_USER }),
      );

      expect(state).not.toBe(mockedStateWithFavorite);
      expect(state).toEqual({
        ...mockedStateWithFavorite,
        users: mockedUsers.map((user) => {
          if (user.id === MOCKED_USER.id) {
            return { ...MOCKED_USER, isFavorite: false };
          }
          return user;
        }),
        favorites: [],
        pending: false,
      });
    });
  });

  describe('Failure Actions', (): void => {
    const mockedInitialState: UsersState = {
      pending: true,
      users: [],
      favorites: [],
    };
    it('getUsersFailure should set pending to false', (): void => {
      const state: UsersState = usersReducer(mockedInitialState, UsersActions.getUsersFailure({ error: 'error' }));

      expect(state).not.toBe(mockedInitialState);
      expect(state).toEqual({
        ...mockedInitialState,
        pending: false,
      });
    });

    it('addUserToFavoritesFailure should set pending to false', (): void => {
      const state: UsersState = usersReducer(mockedInitialState, UsersActions.addUserToFavoritesFailure());

      expect(state).not.toBe(mockedInitialState);
      expect(state).toEqual({
        ...mockedInitialState,
        pending: false,
      });
    });
  });
});

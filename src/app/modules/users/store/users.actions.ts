import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  AddRandomUserProps,
  AddUserToFavoritesProps,
  GetUserSuccessProps,
  RemoveUserToFavoritesProps,
} from '../shared/user-actions.interface';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Get Users': emptyProps(),
    'Get Users Success': props<GetUserSuccessProps>(),
    'Get Users Failure': props<{ error: unknown }>(),

    'Add Random User': props<AddRandomUserProps>(),

    'Add User To Favorites': props<AddUserToFavoritesProps>(),

    'Remove User From Favorites': props<RemoveUserToFavoritesProps>(),
  },
});

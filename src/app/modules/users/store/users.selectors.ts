import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(fromUsers.usersFeatureKey);

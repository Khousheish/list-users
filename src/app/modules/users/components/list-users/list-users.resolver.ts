import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { filter } from 'rxjs';

import { UsersFacade } from '@Modules/users/store/users.facade';

export const listUsersResolver: ResolveFn<boolean> = () => {
  const userFacade: UsersFacade = inject(UsersFacade);
  userFacade.getUsers();

  return userFacade.usersPending$.pipe(filter((pending: boolean) => !pending));
};

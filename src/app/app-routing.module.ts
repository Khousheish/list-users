import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AppRoutes, UserRoutes } from '@Enums/routes.enum';
import { listUsersResolver } from '@Modules/users/components/list-users/list-users.resolver';
import { UsersEffects } from '@Modules/users/store/users.effects';
import { usersFeature } from '@Modules/users/store/users.reducer';

import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: AppRoutes.Users,
    children: [
      {
        path: UserRoutes.List,
        resolve: { userList: listUsersResolver },
        loadComponent: () =>
          import('./modules/users/components/list-users/list-users.component').then((c) => c.ListUsersComponent),
      },
      {
        path: UserRoutes.Favorites,
        loadComponent: () =>
          import('./modules/users/components/favorite-users/favorite-users.component').then(
            (c) => c.FavoriteUsersComponent,
          ),
      },
      {
        path: AppRoutes.Empty,
        pathMatch: 'full',
        redirectTo: UserRoutes.List,
      },
    ],
    providers: [provideState(usersFeature), provideEffects([UsersEffects])],
  },
  {
    path: AppRoutes.Empty,
    pathMatch: 'full',
    redirectTo: `${AppRoutes.Users}/${UserRoutes.List}`,
  },
  {
    path: AppRoutes.Other,
    redirectTo: AppRoutes.NotFound,
  },
  {
    path: AppRoutes.NotFound,
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

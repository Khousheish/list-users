import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes, UserRoutes } from '@Enums/routes.enum';

import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: AppRoutes.Users,
    children: [
      {
        path: UserRoutes.List,
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

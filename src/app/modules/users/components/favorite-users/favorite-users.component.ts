import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';

import { User } from '@Modules/users/shared/user.interface';
import { UsersFacade } from '@Modules/users/store/users.facade';

@Component({
  selector: 'lu-favorite-users',
  standalone: true,
  imports: [CommonModule, TableModule, AvatarModule, RouterModule],
  templateUrl: './favorite-users.component.html',
  styleUrls: ['./favorite-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteUsersComponent {
  protected favoriteUsers$: Observable<User[]> = this.userFacade.favoriteUsers$;

  constructor(private readonly userFacade: UsersFacade) {}
  toggleFavorite(user: User): void {
    user.isFavorite ? this.userFacade.removeUserFromFavorites(user) : this.userFacade.addUserToFavorite(user);
  }
}

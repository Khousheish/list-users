import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { faker } from '@faker-js/faker';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { Observable, interval, tap } from 'rxjs';

import { User } from '@Modules/users/shared/user.interface';
import { UsersFacade } from '@Modules/users/store/users.facade';

@Component({
  selector: 'lu-list-users',
  standalone: true,
  imports: [CommonModule, TableModule, AvatarModule],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent implements OnInit {
  protected user$: Observable<User[]> = this.userFacade.users$;
  private userId: number = 11;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly userFacade: UsersFacade,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    interval(5000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          const user: User = {
            id: this.userId,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            avatar: faker.internet.avatar(),
            isFavorite: false,
          };
          this.userId++;

          this.userFacade.addRandomUser(user);
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe();
  }

  toggleFavorite(user: User): void {
    user.isFavorite ? this.userFacade.removeUserFromFavorites(user) : this.userFacade.addUserToFavorite(user);
  }
}

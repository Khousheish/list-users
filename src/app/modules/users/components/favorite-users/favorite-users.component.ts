import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lu-favorite-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-users.component.html',
  styleUrls: ['./favorite-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteUsersComponent {}

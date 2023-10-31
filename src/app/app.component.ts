import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

import { environment } from '@Environment';

@Component({
  selector: 'lu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, MenubarModule, ToastModule],
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        routerLink: '/users/list',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Favorites',
        icon: 'pi pi-fw pi-star',
        routerLink: '/users/favorites',
        routerLinkActiveOptions: { exact: true },
      },
    ];
    this.translateService.setDefaultLang(environment.defaultLanguage);

    this.translateService.use(environment.defaultLanguage);
  }
}

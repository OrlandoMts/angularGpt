import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Route, RouterLink } from '@angular/router';

import { MenuItf } from '@interfaces/';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-menu-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItemComponent {
  @Input({ required: true }) menuList: Array<MenuItf | Route> | undefined = [];
}

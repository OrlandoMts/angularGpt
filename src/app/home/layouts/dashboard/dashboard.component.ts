import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarMenuItemComponent } from '@components/';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarMenuItemComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public menu = routes[0].children?.filter((route) => route.data);
}

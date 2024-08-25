import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageComponent } from '@components/index';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {}

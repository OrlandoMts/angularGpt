import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-orthography',
  standalone: true,
  imports: [],
  templateUrl: './message-orthography.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageOrthographyComponent {
  @Input({ required: true }) useScore!: number;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) isGpt!: boolean;
  @Input() errors: string[] = [];
}

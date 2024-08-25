import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) isCurrentUser!: boolean;
}

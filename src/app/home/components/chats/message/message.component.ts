import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './message.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) isGpt!: boolean;
}

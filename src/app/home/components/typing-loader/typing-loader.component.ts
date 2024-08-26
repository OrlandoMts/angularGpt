import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  standalone: true,
  imports: [],
  templateUrl: './typing-loader.component.html',
  styleUrl: './typing-loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingLoaderComponent {

}

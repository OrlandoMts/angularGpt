import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  MessageComponent,
  TxtMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { MessageEventItf, MessageItf, OptionItf } from '@interfaces/*';
import { OpenAiSrv } from 'app/home/services';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [MessageComponent, TypingLoaderComponent, TxtMessageBoxComponent],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  public openaiSrv = inject(OpenAiSrv);
  public messages = signal<Array<MessageItf>>([
    { text: 'Hi am omontes', isGpt: false },
    { text: 'Hi am chatgpt', isGpt: true },
  ]);
  public isLoading = signal<boolean>(false);
  public options: Array<OptionItf> = [
    { id: '1', text: 'Opcion 1' },
    { id: '2', text: 'Opcion 2' },
  ];
  public handleMessage(txt: MessageEventItf) {}
}

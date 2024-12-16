import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  MessageComponent,
  TxtMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { MessageEventItf, MessageItf } from '@interfaces/index';
import { OpenAiSrv } from 'app/home/services';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [MessageComponent, TypingLoaderComponent, TxtMessageBoxComponent],
  templateUrl: './pros-cons-stream-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {
  private _openaiSrv = inject(OpenAiSrv);
  private _destroyRef = inject(DestroyRef);
  public abortController = new AbortController();
  public messages = signal<Array<MessageItf>>([
    {
      text: 'Puedo ayudarte a comparar cosas, ¿qué deseas comparar? (stream)',
      isGpt: true,
    },
  ]);
  public isLoading = signal<boolean>(false);

  public async handleMessage(txt: MessageEventItf) {
    const { prompt } = txt;
    this.abortController.abort();
    this.abortController = new AbortController();

    this.messages.update((prev) => [
      ...prev,
      { text: prompt, isGpt: false },
      { text: '...', isGpt: true },
    ]);
    this.isLoading.set(true);
    const stream = this._openaiSrv.prosConsStream(
      prompt,
      this.abortController.signal
    );
    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamRes(text);
    }
  }

  public handleStreamRes(msg: string) {
    this.messages.update((prev) => [
      ...prev.slice(0, -1),
      { text: msg, isGpt: true },
    ]);
  }
}

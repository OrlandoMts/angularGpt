import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MessageComponent,
  TxtMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import {
  HttpResponseItf,
  MessageEventItf,
  MessageItf,
  ProsConsItf,
} from '@interfaces/*';
import { OpenAiSrv } from 'app/home/services';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [MessageComponent, TypingLoaderComponent, TxtMessageBoxComponent],
  templateUrl: './pros-cons-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  private _openaiSrv = inject(OpenAiSrv);
  private _destroyRef = inject(DestroyRef);
  public messages = signal<Array<MessageItf>>([
    {
      text: 'Puedo ayudarte a comparar cosas, ¿qué deseas comparar?',
      isGpt: true,
    },
  ]);
  public isLoading = signal<boolean>(false);

  public handleMessage(txt: MessageEventItf) {
    const { prompt } = txt;
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this._openaiSrv
      .prosConsDiscusser(prompt)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res: HttpResponseItf<ProsConsItf>) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: res.data.content, isGpt: true },
        ]);
      });
  }
}

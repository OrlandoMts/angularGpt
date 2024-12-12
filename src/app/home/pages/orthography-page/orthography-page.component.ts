import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MessageComponent,
  MessageOrthographyComponent,
  TxtMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import {
  HttpResponseItf,
  MessageEventItf,
  MessageItf,
  OptionItf,
  OrthographyItf,
} from '@interfaces/*';
import { OpenAiSrv } from 'app/home/services';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    MessageComponent,
    TypingLoaderComponent,
    TxtMessageBoxComponent,
    MessageOrthographyComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  private _destroyRef = inject(DestroyRef);
  private _openaiSrv = inject(OpenAiSrv);
  private _onDestroy$ = new Subject<void>();
  public isLoading = signal<boolean>(false);
  public messages = signal<Array<MessageItf>>([
    {
      text: 'Hola, soy IndelBot y puedo correguir errores ortograficos en español. Escribe una oración y te dire que tan bueno eres.',
      isGpt: true,
    },
  ]);
  public options: Array<OptionItf> = [
    { id: '1', text: 'Opcion 1' },
    { id: '2', text: 'Opcion 2' },
  ];

  public handleMessage(txt: MessageEventItf) {
    const { prompt } = txt;
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this._openaiSrv
      .checkOrthography(prompt)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res: HttpResponseItf<OrthographyItf>) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: res.data.message, isGpt: true, info: res.data },
        ]);
      });
  }
}

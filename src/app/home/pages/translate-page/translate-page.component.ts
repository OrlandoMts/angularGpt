import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
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
  OptionItf,
} from '@interfaces/*';
import { OpenAiSrv } from 'app/home/services';
import { LanguageEnum, TranslateItf } from '../../../interfaces/translate.itf';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [MessageComponent, TypingLoaderComponent, TxtMessageBoxComponent],
  templateUrl: './translate-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent implements OnInit {
  private _openaiSrv = inject(OpenAiSrv);
  private _destroyRef = inject(DestroyRef);
  public language = LanguageEnum;
  public messages = signal<Array<MessageItf>>([
    { text: 'Hola, escribe un texto que quieras que traduzca.', isGpt: true },
  ]);
  public isLoading = signal<boolean>(false);

  public options: Array<OptionItf> = [];

  ngOnInit(): void {
    this.options = this.mapEnumToOptions(this.language);
  }

  private mapEnumToOptions(
    languageEnum: typeof LanguageEnum
  ): Array<OptionItf> {
    return Object.entries(languageEnum).map(([key, value]) => ({
      id: value, // Clave del enum (e.g., "EN")
      text: value as string, // Valor del enum (e.g., "ingles")
    }));
  }

  public handleMessage(txt: MessageEventItf) {
    const { prompt, selectedOption } = txt;
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this._openaiSrv
      .translateText(prompt, (selectedOption as LanguageEnum) || '')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res: HttpResponseItf<TranslateItf> | null) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: res?.data.message || '', isGpt: true },
        ]);
      });
  }
}

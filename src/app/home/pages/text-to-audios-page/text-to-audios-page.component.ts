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
  MessageEventItf,
  MessageItf,
  OptionItf,
  VoiceEnum,
} from '@interfaces/index';
import { OpenAiSrv } from 'app/home/services';

@Component({
  selector: 'app-text-to-audios-page',
  standalone: true,
  imports: [MessageComponent, TypingLoaderComponent, TxtMessageBoxComponent],
  templateUrl: './text-to-audios-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudiosPageComponent {
  private _openaiSrv = inject(OpenAiSrv);
  private _destroyRef = inject(DestroyRef);
  public voices = VoiceEnum;
  public messages = signal<Array<MessageItf>>([
    {
      text: 'Hola, escribe un texto que quieras que convierta a un audio.',
      isGpt: true,
    },
  ]);
  public isLoading = signal<boolean>(false);

  public options: Array<OptionItf> = [];

  ngOnInit(): void {
    this.options = this.mapEnumToOptions(this.voices);
  }

  private mapEnumToOptions(voicesEnum: typeof VoiceEnum): Array<OptionItf> {
    return Object.entries(voicesEnum).map(([key, value]) => ({
      id: value, // Clave del enum (e.g., "ALLOY")
      text: value as string, // Valor del enum (e.g., "alloy")
    }));
  }

  public handleMessage(txt: MessageEventItf) {
    const { prompt, selectedOption } = txt;
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this._openaiSrv
      .textToAudio(prompt, (selectedOption as VoiceEnum) || '')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: 'Audio generado', isGpt: true, audioUrl: res?.audioUrl },
        ]);
      });
  }
}

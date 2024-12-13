import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { HttpResponseItf, OrthographyItf, ProsConsItf } from '@interfaces/*';
import {
  orthographyUC,
  prosConsDiscusserUC,
  prosConsStreamUC,
  translateUC,
} from 'app/core';
import { LanguageEnum, TranslateItf } from '../../interfaces/translate.itf';

@Injectable({ providedIn: 'root' })
export class OpenAiSrv {
  public checkOrthography(
    prompt: string
  ): Observable<HttpResponseItf<OrthographyItf>> {
    return from(orthographyUC(prompt));
  }

  public prosConsDiscusser(
    prompt: string
  ): Observable<HttpResponseItf<ProsConsItf>> {
    return from(prosConsDiscusserUC(prompt));
  }

  public prosConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUC(prompt, abortSignal);
  }

  public translateText(
    prompt: string,
    lang: LanguageEnum
  ): Observable<HttpResponseItf<TranslateItf> | null> {
    return from(translateUC(prompt, lang));
  }
}

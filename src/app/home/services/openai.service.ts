import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { HttpResponseItf, OrthographyItf } from '@interfaces/*';
import { orthographyUC } from 'app/core';

@Injectable({ providedIn: 'root' })
export class OpenAiSrv {
  constructor() {}

  public checkOrthography(
    prompt: string
  ): Observable<HttpResponseItf<OrthographyItf>> {
    return from(orthographyUC(prompt));
  }
}

import { HttpResponseItf, TranslateItf } from '@interfaces/index';
import { ERR_ORTHOGRAPHY_MSG } from 'app/messages/label.msg';
import { environment } from 'environments/environment.development';

export const translateUC = async (
  prompt: string,
  lang: string
): Promise<HttpResponseItf<TranslateItf> | null> => {
  try {
    const response = await fetch(`${environment.api_backend}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) {
      throw new Error(ERR_ORTHOGRAPHY_MSG);
    }
    const data = (await response.json()) as HttpResponseItf<TranslateItf>;
    return data;
  } catch (error) {
    return null;
  }
};

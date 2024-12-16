import { HttpResponseItf, ProsConsItf } from '@interfaces/index';
import {
  ERR_PROS_CONS_DISC_MSG,
  ERR_REQUEST_MSG,
} from 'app/messages/label.msg';
import { environment } from 'environments/environment.development';

export const prosConsDiscusserUC = async (
  prompt: string
): Promise<HttpResponseItf<ProsConsItf>> => {
  try {
    const response = await fetch(
      `${environment.api_backend}/pros-cons-discusser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      throw new Error(ERR_PROS_CONS_DISC_MSG);
    }
    const data = (await response.json()) as HttpResponseItf<ProsConsItf>;
    return data;
  } catch (error) {
    return {
      statusCode: 500,
      ok: false,
      message: ERR_REQUEST_MSG,
      error: error,
      data: {
        role: '',
        content: '',
      },
    };
  }
};

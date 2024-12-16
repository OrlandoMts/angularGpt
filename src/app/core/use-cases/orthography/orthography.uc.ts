import { HttpResponseItf, OrthographyItf } from '@interfaces/index';
import { ERR_ORTHOGRAPHY_MSG, ERR_REQUEST_MSG } from 'app/messages/label.msg';
import { environment } from 'environments/environment.development';

export const orthographyUC = async (
  prompt: string
): Promise<HttpResponseItf<OrthographyItf>> => {
  try {
    const response = await fetch(
      `${environment.api_backend}/orthography-check`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      throw new Error(ERR_ORTHOGRAPHY_MSG);
    }
    const data = (await response.json()) as HttpResponseItf<OrthographyItf>;
    return data;
  } catch (error) {
    return {
      statusCode: 500,
      ok: false,
      message: ERR_REQUEST_MSG,
      error: error,
      data: {
        userScore: 0,
        message: '',
        errors: [],
      },
    };
  }
};

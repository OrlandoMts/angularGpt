import { ERR_REQUEST_ABSENCE_MSG } from 'app/messages/label.msg';
import { environment } from 'environments/environment';

export async function* absenceUC(prompt: string, abortSignal: AbortSignal) {
  try {
    const response = await fetch(`${environment.url_api}/chat/absence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal,
    });

    if (!response.ok) {
      throw new Error(ERR_REQUEST_ABSENCE_MSG);
    }
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No se pudo obtener el reader');

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      text += chunk;
      yield text;
    }
    return text;
  } catch (error) {
    return null;
  }
}

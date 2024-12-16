import { TextToAudioItf } from '@interfaces/textToAudio.itf';
import { ERR_TEXT_TO_AUDIO_MSG } from 'app/messages/label.msg';
import { environment } from 'environments/environment.development';

export const textToAudioUC = async (
  prompt: string,
  voice: string
): Promise<TextToAudioItf> => {
  try {
    const response = await fetch(`${environment.api_backend}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    const audioFile = await response.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl,
    };
  } catch (error) {
    return {
      ok: false,
      message: ERR_TEXT_TO_AUDIO_MSG,
      audioUrl: '',
    };
  }
};

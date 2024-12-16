export enum VoiceEnum {
  NOVA = 'nova',
  SHIMMER = 'shimmer',
  ECHO = 'echo',
  ONYX = 'onyx',
  ALLOY = 'alloy',
  FABLE = 'fable',
}

export interface TextToAudioItf {
  ok: boolean;
  message: string;
  audioUrl: string;
}

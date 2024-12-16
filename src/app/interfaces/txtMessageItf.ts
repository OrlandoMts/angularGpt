import { OrthographyItf } from './index';

export interface MessageEventItf {
  prompt: string;
  file?: File | null;
  selectedOption?: string;
}

export interface OptionItf {
  id: string;
  text: string;
}

export interface MessageItf {
  text: string;
  isGpt: boolean;
  info?: OrthographyItf;
  audioUrl?: string;
}

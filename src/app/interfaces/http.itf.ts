export interface HttpResponseItf<T> {
  statusCode: number;
  ok: boolean;
  message: string;
  error: unknown;
  data: T;
  path?: string;
}

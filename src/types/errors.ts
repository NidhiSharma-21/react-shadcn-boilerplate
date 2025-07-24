export interface ApiErrorResponse {
  status?: number;
  data?: {
    message?: string;
    [key: string]: any;
  };
}

export interface CustomAxiosError extends Error {
  isAxiosError: true;
  response?: ApiErrorResponse;
  request?: any;
}

export type ApiError = CustomAxiosError | Error;
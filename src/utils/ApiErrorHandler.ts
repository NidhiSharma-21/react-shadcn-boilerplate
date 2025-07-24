// utils/ApiErrorHandler.ts
import { LOGIN_PATH } from '../constants/paths';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { CustomAxiosError } from '../types/errors';

// Custom type guard
function isAxiosError(error: unknown): error is CustomAxiosError {
  return (error as CustomAxiosError)?.isAxiosError === true;
}

export const handleApiError = (error: unknown, customMessage?: string): string => {
  let message = customMessage || 'Something went wrong. Please try again.';

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status) {
      switch (status) {
        case 400:
          message = data?.message || 'Bad Request. Please check your input.';
          break;
        case 401:
          message = 'Session expired. Redirecting to login...';
          localStorage.removeItem('token');
          setTimeout(() => window.location.replace(LOGIN_PATH), 1500);
          break;
        case 403:
          message = 'You do not have permission to perform this action.';
          break;
        case 404:
          message = 'Requested resource was not found.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = data?.message || `Unexpected error (status: ${status}).`;
      }
    } else if (error.request) {
      message = 'No response from server. Please check your network.';
    } else {
      message = error.message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  console.error('[API ERROR]:', message, error);
  showErrorToast(message);

  return message;
};

const showErrorToast = (msg: string) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  });
};
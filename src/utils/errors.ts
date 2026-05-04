import { Alert } from 'react-native';
import type { AppError, AppErrorCode } from '@/types/types';

export const createAppError = (
  code: AppErrorCode,
  message: string,
  cause?: unknown,
): AppError => ({
  code,
  message,
  cause,
});

export const getErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong.',
) => {
  if (typeof error === 'object' && error && 'message' in error) {
    const message = String(error.message);
    return message || fallback;
  }

  return fallback;
};

export const showFeedback = (title: string, message: string) => {
  Alert.alert(title, message);
};

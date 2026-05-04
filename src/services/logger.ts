import type { LogMetadata } from '@/types/types';

export const logger = {
  info: (message: string, metadata?: LogMetadata) => {
    if (__DEV__) {
      console.info(message, metadata ?? '');
    }
  },
  warn: (message: string, metadata?: LogMetadata) => {
    if (__DEV__) {
      console.warn(message, metadata ?? '');
    }
  },
  error: (message: string, error?: unknown) => {
    if (__DEV__) {
      console.error(message, error);
    }
  },
};

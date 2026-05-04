import { env } from '@/config/env';
import type { ApiResult, AppError, RequestOptions } from '@/types/types';
import { createAppError, getErrorMessage } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';

const buildUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  return `${env.apiUrl}${path}`;
};

const request = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResult<T>> => {
  try {
    const response = await fetch(buildUrl(path), options);
    const data = options.skipJsonParse ? null : ((await response.json()) as T);

    if (!response.ok) {
      return {
        data: null,
        error: createAppError(
          'NETWORK_ERROR',
          `Request failed with status ${response.status}`,
        ),
      };
    }

    return { data: data as T, error: null };
  } catch (error) {
    const appError: AppError = createAppError(
      'NETWORK_ERROR',
      getErrorMessage(error, FEEDBACK_MESSAGES.networkUnavailable),
      error,
    );

    return { data: null, error: appError };
  }
};

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
};

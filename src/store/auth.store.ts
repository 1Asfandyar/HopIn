import { create } from 'zustand';
import { authService } from '@/services/authService';
import { logger } from '@/services/logger';
import type { AuthStore } from '@/types/types';
import { createAppError, getErrorMessage } from '@/utils/errors';

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoading: true,
  error: null,

  login: async credentials => {
    set({ error: null, isLoading: true });

    try {
      const session = await authService.login(credentials);
      set({ user: session.user, isLoading: false });
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getErrorMessage(error, 'Unable to log in.'),
        error,
      );

      logger.error('Login failed', error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  register: async payload => {
    set({ error: null, isLoading: true });

    try {
      const session = await authService.register(payload);
      set({ user: session.user, isLoading: false });
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getErrorMessage(error, 'Unable to register.'),
        error,
      );

      logger.error('Registration failed', error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, error: null, isLoading: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });

    try {
      const session = await authService.getSession();
      set({ user: session?.user ?? null, isLoading: false, error: null });
    } catch (error) {
      logger.error('Auth check failed', error);
      set({ user: null, isLoading: false });
    }
  },
}));

export const selectAuthUser = (state: AuthStore) => state.user;
export const selectAuthLoading = (state: AuthStore) => state.isLoading;
export const selectAuthError = (state: AuthStore) => state.error;

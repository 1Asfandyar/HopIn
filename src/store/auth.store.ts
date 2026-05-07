import { create } from 'zustand';
import { authService } from '@/services/authService';
import { logger } from '@/services/logger';
import type { AuthStore } from '@/types/types';
import { createAppError, getErrorMessage } from '@/utils/errors';

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoading: true,
  error: null,

  signInWithGoogle: async () => {
    set({ error: null, isLoading: true });

    try {
      await authService.signInWithGoogle();
      set({ isLoading: false });
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getErrorMessage(error, 'Unable to continue with Google.'),
        error,
      );

      logger.error('Google sign-in failed', error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  handleOAuthCallback: async url => {
    set({ error: null, isLoading: true });

    try {
      const session = await authService.handleOAuthCallback(url);
      set({ user: session?.user ?? null, isLoading: false });
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getErrorMessage(error, 'Unable to complete Google sign-in.'),
        error,
      );

      logger.error('Google OAuth callback failed', error);
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

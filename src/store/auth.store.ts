import { create } from 'zustand';
import { authService } from '@/services/authService';
import { logger } from '@/services/logger';
import type { AuthStore } from '@/types/types';
import { createAppError, getErrorMessage } from '@/utils/errors';

const getEmailOtpErrorMessage = (error: unknown) => {
  const message = getErrorMessage(error);

  if (message.toLowerCase().includes('email logins are disabled')) {
    return 'Email login is disabled in Supabase. Enable the Email provider in Authentication settings, then try again.';
  }

  return "Couldn't send OTP. Please check your email and try again.";
};

export const useAuthStore = create<AuthStore>((set, get) => ({
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

  sendEmailOtp: async email => {
    set({ error: null, isLoading: true });

    try {
      await authService.sendEmailOtp(email);
      set({ isLoading: false });
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getEmailOtpErrorMessage(error),
        error,
      );

      logger.error('Email OTP send failed', error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  verifyEmailOtp: async (email, otp) => {
    set({ error: null, isLoading: true });

    try {
      const session = await authService.verifyEmailOtp(email, otp);
      set({ user: session?.user ?? null, isLoading: false });
      return session?.user ?? null;
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getErrorMessage(
          error,
          'Incorrect OTP. Please enter the latest code sent to your email.',
        ),
        error,
      );

      logger.error('Email OTP verification failed', error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  completeProfile: async profile => {
    set({ error: null, isLoading: true });

    try {
      const session = await authService.completeProfile(profile);
      set({ user: session?.user ?? null, isLoading: false });
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getErrorMessage(error, 'Unable to save your profile.'),
        error,
      );

      logger.error('Profile completion failed', error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  updateUserRole: async role => {
    set({ error: null, isLoading: true });

    try {
      const currentUser = get().user;
      const currentSession = await authService.getSession();
      const session = await authService.completeProfile({
        fullName: currentUser?.fullName ?? currentSession?.user.fullName ?? '',
        role,
      });
      set({ user: session?.user ?? null, isLoading: false });
    } catch (error) {
      const appError = createAppError(
        'AUTH_FAILED',
        getErrorMessage(error, 'Unable to switch role.'),
        error,
      );

      logger.error('Role switch failed', error);
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

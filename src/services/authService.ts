import type { AuthSession } from '@/types/types';
import * as ExpoLinking from 'expo-linking';
import { Linking } from 'react-native';
import { AUTH_SESSION_STORAGE_KEY } from '@/config/constants';
import { storageService } from './storageService';
import { supabase } from './supabaseClient';
import {
  getOAuthCode,
  GOOGLE_AUTH_REDIRECT_PATH,
  mapSupabaseSession,
} from '@/features/auth/helpers/auth.helpers';

const persistSession = async (session: AuthSession) => {
  await storageService.setString(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
};

export const authService = {
  signInWithGoogle: async () => {
    const redirectTo = ExpoLinking.createURL(GOOGLE_AUTH_REDIRECT_PATH);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      throw error;
    }

    if (!data.url) {
      throw new Error('Google sign-in did not return an authorization URL.');
    }

    await Linking.openURL(data.url);
  },

  handleOAuthCallback: async (url: string): Promise<AuthSession | null> => {
    const code = getOAuthCode(url);

    if (!code) {
      return null;
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw error;
    }

    if (!data.session) {
      return null;
    }

    const session = mapSupabaseSession(data.session);
    await persistSession(session);

    return session;
  },

  logout: async () => {
    await supabase.auth.signOut();
    await storageService.remove(AUTH_SESSION_STORAGE_KEY);
  },

  getSession: async (): Promise<AuthSession | null> => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (data.session) {
      const session = mapSupabaseSession(data.session);
      await persistSession(session);
      return session;
    }

    const session = await storageService.getString(AUTH_SESSION_STORAGE_KEY);

    return session ? (JSON.parse(session) as AuthSession) : null;
  },
};

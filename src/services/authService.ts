import type { AuthSession } from '@/types/types';
import * as ExpoLinking from 'expo-linking';
import { Linking } from 'react-native';
import { AUTH_SESSION_STORAGE_KEY } from '@/config/constants';
import { storageService } from './storageService';
import { supabase } from './supabaseClient';
import {
  APP_SCHEME,
  getOAuthCode,
  GOOGLE_AUTH_REDIRECT_PATH,
  mapSupabaseSession,
} from '@/features/auth/helpers/auth.helpers';

const PROFILE_PHOTOS_BUCKET = 'profile-photos';

const persistSession = async (session: AuthSession) => {
  await storageService.setString(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
};

const isLocalFileUri = (uri?: string) =>
  Boolean(uri?.startsWith('file://') || uri?.startsWith('content://'));

const getImageExtension = (uri: string) => {
  const extension = uri.split('?')[0]?.split('.').pop()?.toLowerCase();

  if (extension === 'png' || extension === 'webp') {
    return extension;
  }

  return 'jpg';
};

const getImageContentType = (extension: string) => {
  if (extension === 'png') {
    return 'image/png';
  }

  if (extension === 'webp') {
    return 'image/webp';
  }

  return 'image/jpeg';
};

const uploadProfilePhoto = async (userId: string, localUri?: string) => {
  if (!isLocalFileUri(localUri) || !localUri) {
    return localUri;
  }

  const extension = getImageExtension(localUri);
  const response = await fetch(localUri);
  const imageBlob = await response.blob();
  const filePath = `${userId}/profile-${Date.now()}.${extension}`;
  const { error } = await supabase.storage
    .from(PROFILE_PHOTOS_BUCKET)
    .upload(filePath, imageBlob, {
      contentType: getImageContentType(extension),
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from(PROFILE_PHOTOS_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export const authService = {
  signInWithGoogle: async () => {
    const redirectTo = ExpoLinking.createURL(GOOGLE_AUTH_REDIRECT_PATH, {
      scheme: APP_SCHEME,
    });
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

  sendEmailOtp: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      throw error;
    }
  },

  verifyEmailOtp: async (
    email: string,
    token: string,
  ): Promise<AuthSession | null> => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

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

  completeProfile: async (profile: {
    fullName: string;
    role?: AuthSession['user']['role'];
    photoUrl?: string;
  }): Promise<AuthSession | null> => {
    const { data: existingSessionData, error: existingSessionError } =
      await supabase.auth.getSession();

    if (existingSessionError) {
      throw existingSessionError;
    }

    const userId = existingSessionData.session?.user.id;

    if (!userId) {
      throw new Error('No authenticated user found for profile update.');
    }

    const uploadedPhotoUrl =
      profile.photoUrl !== undefined
        ? await uploadProfilePhoto(userId, profile.photoUrl)
        : undefined;
    const metadata: {
      full_name: string;
      name: string;
      role?: AuthSession['user']['role'];
      photo_url?: string;
    } = {
      full_name: profile.fullName,
      name: profile.fullName,
      role: profile.role,
    };

    if (uploadedPhotoUrl !== undefined) {
      metadata.photo_url = uploadedPhotoUrl;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: metadata,
    });

    if (error) {
      throw error;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!sessionData.session || !data.user) {
      return null;
    }

    const session = mapSupabaseSession(sessionData.session);
    session.user = {
      ...session.user,
      fullName: profile.fullName,
      role: profile.role,
      photoUrl: uploadedPhotoUrl ?? session.user.photoUrl,
      isProfileComplete: Boolean(profile.fullName && profile.role),
      isEmailVerified: true,
    };
    await persistSession(session);

    return session;
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

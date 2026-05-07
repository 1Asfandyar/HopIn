import type { Session } from '@supabase/supabase-js';
import type { AuthSession, User } from '@/types/types';

export const APP_SCHEME = 'hopin';
export const GOOGLE_AUTH_REDIRECT_PATH = 'auth/callback';

export const getOAuthCode = (url: string) => {
  const parsedUrl = new URL(url);
  const searchCode = parsedUrl.searchParams.get('code');

  if (searchCode) {
    return searchCode;
  }

  const hashParams = new URLSearchParams(parsedUrl.hash.replace(/^#/, ''));
  return hashParams.get('code');
};

export const mapSupabaseSession = (session: Session): AuthSession => {
  const metadata = session.user.user_metadata;
  const email = session.user.email ?? '';

  const user: User = {
    id: session.user.id,
    email,
    fullName:
      typeof metadata.full_name === 'string'
        ? metadata.full_name
        : typeof metadata.name === 'string'
          ? metadata.name
          : undefined,
    phone:
      typeof session.user.phone === 'string' && session.user.phone.length > 0
        ? session.user.phone
        : undefined,
  };

  return {
    user,
    accessToken: session.access_token,
  };
};

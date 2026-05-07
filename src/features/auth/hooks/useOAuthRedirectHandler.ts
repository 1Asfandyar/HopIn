import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';
import { GOOGLE_AUTH_REDIRECT_PATH } from '../helpers/auth.helpers';
import { logger } from '@/services/logger';
import { useAuthStore } from '@/store/auth.store';

export const useOAuthRedirectHandler = () => {
  const router = useRouter();
  const handledOAuthUrlRef = useRef<string | null>(null);
  const handleOAuthCallback = useAuthStore(state => state.handleOAuthCallback);

  useEffect(() => {
    const handleUrl = async (url: string | null) => {
      if (!url || !url.includes(GOOGLE_AUTH_REDIRECT_PATH)) {
        return;
      }

      if (handledOAuthUrlRef.current === url) {
        return;
      }

      handledOAuthUrlRef.current = url;

      try {
        await handleOAuthCallback(url);
        router.replace('/');
      } catch (error) {
        logger.error('Unable to handle OAuth redirect', error);
      }
    };

    Linking.getInitialURL().then(handleUrl);

    const subscription = Linking.addEventListener('url', event => {
      handleUrl(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, [handleOAuthCallback, router]);
};

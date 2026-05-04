import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import {
  selectAuthLoading,
  selectAuthUser,
  useAuthStore,
} from '@/store/auth.store';
import WelcomeScreen from '@/features/main/home/screens/WelcomeScreen';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { AUTH_LOADER_MIN_MS } from '@/config/constants';
import { useMinimumDelay } from '@/hooks/useMinimumDelay';

export default function Index() {
  const user = useAuthStore(selectAuthUser);
  const isLoading = useAuthStore(selectAuthLoading);
  const checkAuth = useAuthStore(state => state.checkAuth);
  const hasMinimumDelayElapsed = useMinimumDelay(AUTH_LOADER_MIN_MS);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading || !hasMinimumDelayElapsed) {
    return <BrandedLoader />;
  }
  if (!user) {
    return <WelcomeScreen />;
  }

  return <Redirect href="/(main)/(tabs)/home" />;
}

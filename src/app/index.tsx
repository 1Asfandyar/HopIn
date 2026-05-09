import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import {
  selectAuthLoading,
  selectAuthUser,
  useAuthStore,
} from '@/store/auth.store';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { AUTH_LOADER_MIN_MS } from '@/config/constants';
import { useMinimumDelay } from '@/hooks/useMinimumDelay';
import { APP_ROUTES } from '@/constants/appRoutes';

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
    return <Redirect href={APP_ROUTES.auth.welcome} />;
  }

  if (!user.isProfileComplete) {
    return <Redirect href={APP_ROUTES.auth.basicProfile} />;
  }

  return <Redirect href={APP_ROUTES.main.home} />;
}

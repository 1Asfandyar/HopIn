import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import {
  selectAuthLoading,
  selectAuthUser,
  useAuthStore,
} from '@/store/auth.store';
import WelcomeScreen from '@/features/main/home/screens/WelcomeScreen';

export default function Index() {
  const user = useAuthStore(selectAuthUser);
  const isLoading = useAuthStore(selectAuthLoading);
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return null;
  if (!user) {
    return <WelcomeScreen />;
  }

  return <Redirect href="/(main)/(tabs)/home" />;
}

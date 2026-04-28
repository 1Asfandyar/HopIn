import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/store/useAuth';
import WelcomeScreen from '@/features/main/home/screens/WelcomeScreen';

export default function Index() {
  const { user, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) return null;
  if (!user) {
    return <WelcomeScreen />;
  }

  return <Redirect href="/(main)/home" />;
}

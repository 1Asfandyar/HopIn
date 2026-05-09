import { useEffect } from 'react';
import { Redirect, Stack, useSegments } from 'expo-router';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { APP_ROUTES } from '@/constants/appRoutes';
import { useAuthStore } from '@/store/auth.store';
import { fontFamilies, themeColors } from '@/theme/tokens';

const AuthLayout = () => {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);
  const checkAuth = useAuthStore(state => state.checkAuth);
  const segments = useSegments();
  const activeScreen = segments[segments.length - 1];

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <BrandedLoader />;
  }

  if (user?.isProfileComplete && activeScreen !== 'complete') {
    return <Redirect href={APP_ROUTES.main.home} />;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: themeColors.white,
        },
        gestureEnabled: true,
        headerShown: false,
        headerStyle: {
          backgroundColor: themeColors.white,
        },
        headerTitleStyle: {
          fontFamily: fontFamilies.semiBold,
        },
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="enter-email" />
      <Stack.Screen name="verify-otp" />
      <Stack.Screen name="basic-profile" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="profile-photo" />
      <Stack.Screen name="complete" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;

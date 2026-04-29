import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { themeColors } from '@/theme/tokens';
import AppHeader from '@/theme/components/AppHeader';

const MainLayout = () => {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: themeColors.white,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="offer-ride"
        options={{
          header: () => (
            <AppHeader
              title="Offer a Ride"
              leftIcon="arrow-back"
              onLeftPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="find-ride"
        options={{
          header: () => (
            <AppHeader
              title="Find a Ride"
              leftIcon="arrow-back"
              onLeftPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default MainLayout;

import { useCallback, useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Redirect, Stack, useFocusEffect, useRouter } from 'expo-router';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { APP_ROUTES } from '@/constants/appRoutes';
import { useAuthStore } from '@/store/auth.store';
import { themeColors } from '@/theme/tokens';
import AppHeader from '@/theme/components/AppHeader';

const MainLayout = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );

      return () => subscription.remove();
    }, []),
  );

  if (isLoading) {
    return <BrandedLoader />;
  }

  if (!user) {
    return <Redirect href={APP_ROUTES.auth.welcome} />;
  }

  if (!user.isProfileComplete) {
    return <Redirect href={APP_ROUTES.auth.basicProfile} />;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
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
          <Stack.Screen
            name="ride-details"
            options={{
              header: () => (
                <AppHeader
                  title="Ride Details"
                  leftIcon="arrow-back"
                  onLeftPress={() => router.back()}
                />
              ),
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

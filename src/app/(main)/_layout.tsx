import { useCallback } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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

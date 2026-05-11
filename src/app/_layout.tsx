import '../../global.css';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FONT_SOURCES } from '../assets/fonts/font.config';
import { fontFamilies, themeColors } from '@/theme/tokens';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { useOAuthRedirectHandler } from '@/features/auth/hooks/useOAuthRedirectHandler';

export default function RootLayout() {
  const [loaded] = useFonts(FONT_SOURCES);
  const [isSplashVisible, setSplashVisible] = useState(true);
  useOAuthRedirectHandler();

  if (!loaded) {
    return <BrandedLoader />;
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: themeColors.white,
            },
            gestureEnabled: false,
            headerTitleStyle: {
              fontFamily: fontFamilies.semiBold,
            },
            headerStyle: {
              backgroundColor: themeColors.white,
            },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, gestureEnabled: true }}
          />
          <Stack.Screen
            name="auth/callback"
            options={{ title: 'Signing In', gestureEnabled: false }}
          />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
        {isSplashVisible && (
          <View className="absolute inset-0">
            <BrandedLoader
              variant="splash"
              onFinish={() => setSplashVisible(false)}
            />
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

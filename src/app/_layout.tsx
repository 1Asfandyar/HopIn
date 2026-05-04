import '../../global.css';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { FONT_SOURCES } from '../assets/fonts/font.config';
import { fontFamilies, themeColors } from '@/theme/tokens';
import BrandedLoader from '@/components/feedback/BrandedLoader';

export default function RootLayout() {
  const [loaded] = useFonts(FONT_SOURCES);
  const [isSplashVisible, setSplashVisible] = useState(true);

  if (!loaded) {
    return <BrandedLoader />;
  }

  return (
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
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen
            name="(auth)/login"
            options={{ title: 'Login', gestureEnabled: true }}
          />
          <Stack.Screen
            name="(auth)/register"
            options={{ title: 'Sign Up', gestureEnabled: true }}
          />
          <Stack.Screen name="(main)/welcome" options={{ title: 'Welcome' }} />
        </Stack>
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
  );
}

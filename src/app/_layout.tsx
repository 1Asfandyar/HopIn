// app/_layout.tsx
import '../../global.css'; // Make sure this is imported FIRST
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { FONT_SOURCES } from '../assets/fonts/font.config';
import { fontFamilies, themeColors } from '@/theme/tokens';

export default function RootLayout() {
  const [loaded] = useFonts(FONT_SOURCES);

  if (!loaded) {
    return null;
  }

  return (
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
  );
}

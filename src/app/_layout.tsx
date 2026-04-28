// app/_layout.tsx
import '../../global.css'; // Make sure this is imported FIRST
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { FONT_SOURCES } from '../assets/fonts/font.config';

export default function RootLayout() {
  const [loaded] = useFonts(FONT_SOURCES);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontFamily: 'Poppins_600SemiBold',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShown: false,
      }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} />
        <Stack.Screen name="(auth)/register" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="(main)/welcome" options={{ title: 'Welcome' }} />
      </Stack>
    </Stack>
  );
}

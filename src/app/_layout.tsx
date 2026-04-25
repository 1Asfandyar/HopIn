// app/_layout.tsx
import '../../global.css' // Make sure this is imported FIRST
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { FONT_SOURCES } from '../assets/fonts/font.config'

export default function RootLayout() {
  const [loaded] = useFonts(FONT_SOURCES)

  if (!loaded) {
    return null
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
      }}
    >
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>
  )
}

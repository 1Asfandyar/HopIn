import { Stack } from 'expo-router';
import { fontFamilies, themeColors } from '@/theme/tokens';

const AuthLayout = () => {
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

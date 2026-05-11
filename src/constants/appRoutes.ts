import type { Href } from 'expo-router';

const route = (href: string) => href as unknown as Href;

export const APP_ROUTES = {
  auth: {
    welcome: route('/(auth)/welcome'),
    enterEmail: route('/(auth)/enter-email'),
    verifyOtp: route('/(auth)/verify-otp'),
    basicProfile: route('/(auth)/basic-profile'),
    roleSelection: route('/(auth)/role-selection'),
    profilePhoto: route('/(auth)/profile-photo'),
    complete: route('/(auth)/complete'),
  },
  main: {
    home: route('/(main)/(tabs)/home'),
    rides: route('/(main)/(tabs)/rides'),
    profile: route('/(main)/(tabs)/profile'),
    setRideDetails: route('/(main)/set-ride-details'),
    rideResults: route('/(main)/ride-results'),
    rideDetails: route('/(main)/ride-details'),
  },
} as const;

import Constants from 'expo-constants';
import type { ExpoExtra } from '@/types/types';

const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;

export const env = {
  apiUrl: extra.apiUrl ?? '',
  googleMapsApiKey: extra.googleMapsApiKey ?? '',
  googlePlacesApiKey: extra.googlePlacesApiKey ?? '',
};

export const hasGooglePlacesApiKey = env.googlePlacesApiKey.trim().length > 0;

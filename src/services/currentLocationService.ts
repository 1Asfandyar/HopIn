import * as Location from 'expo-location';
import { env } from '@/config/env';
import type { AppLocation } from '@/types/types';
import { createAppError } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import { formatGeocodedAddress } from '@/features/location/helpers/location.helpers';

const getNearbyPlaceLabel = async (coords: {
  latitude: number;
  longitude: number;
}) => {
  if (!env.googlePlacesApiKey.trim()) {
    return null;
  }

  const params = new URLSearchParams({
    key: env.googlePlacesApiKey,
    location: `${coords.latitude},${coords.longitude}`,
    rankby: 'distance',
    language: 'en',
    type: 'establishment',
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`,
  );
  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Nearby Search API error: ${data.status}`);
  }

  const place = data.results?.[0];

  if (!place?.name) {
    return null;
  }

  return [place.name, place.vicinity].filter(Boolean).join(', ');
};

export const currentLocationService = {
  getLocationFromCoordinates: async (coords: {
    latitude: number;
    longitude: number;
  }): Promise<AppLocation> => {
    const [address] = await Location.reverseGeocodeAsync(coords);
    const nearbyPlaceLabel = await getNearbyPlaceLabel(coords).catch(
      () => null,
    );

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      address: nearbyPlaceLabel ?? formatGeocodedAddress(address),
      city: address?.city ?? null,
      country: address?.country ?? null,
      countryCode: address?.isoCountryCode?.toLowerCase() ?? null,
    };
  },

  getCurrentLocation: async (): Promise<AppLocation> => {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      throw createAppError(
        'LOCATION_PERMISSION_DENIED',
        FEEDBACK_MESSAGES.locationPermissionDenied,
      );
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return currentLocationService.getLocationFromCoordinates(position.coords);
  },
};

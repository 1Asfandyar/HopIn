import * as Location from 'expo-location';
import type { AppLocation } from '@/types/types';
import { createAppError } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import { formatGeocodedAddress } from '@/features/location/helpers/location.helpers';

export const locationService = {
  getCurrentLocation: async (): Promise<AppLocation> => {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      throw createAppError(
        'LOCATION_PERMISSION_DENIED',
        FEEDBACK_MESSAGES.locationPermissionDenied,
      );
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = position.coords;
    const [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    return {
      latitude,
      longitude,
      address: formatGeocodedAddress(address),
      city: address?.city ?? null,
      country: address?.country ?? null,
      countryCode: address?.isoCountryCode?.toLowerCase() ?? null,
    };
  },
};

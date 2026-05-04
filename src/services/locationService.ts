import * as Location from 'expo-location';
import type { AppLocation } from '@/types/types';
import { createAppError } from '@/utils/errors';

const formatAddress = (address?: Location.LocationGeocodedAddress) => {
  if (!address) {
    return 'Current location';
  }

  return (
    address.formattedAddress ||
    [
      address.name,
      address.street,
      address.district,
      address.city,
      address.region,
      address.country,
    ]
      .filter(Boolean)
      .join(', ') ||
    'Current location'
  );
};

export const locationService = {
  getCurrentLocation: async (): Promise<AppLocation> => {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      throw createAppError(
        'LOCATION_PERMISSION_DENIED',
        'Location permission was denied.',
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
      address: formatAddress(address),
      city: address?.city ?? null,
      country: address?.country ?? null,
      countryCode: address?.isoCountryCode?.toLowerCase() ?? null,
    };
  },
};

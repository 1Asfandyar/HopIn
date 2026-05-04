import type {
  AppLocation,
  GooglePlaceData,
  GooglePlaceDetails,
  LocationGeocodedAddress,
} from '@/types/types';
import { CURRENT_LOCATION_FALLBACK_LABEL } from '@/config/constants';

export const formatGeocodedAddress = (address?: LocationGeocodedAddress) => {
  if (!address) {
    return CURRENT_LOCATION_FALLBACK_LABEL;
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
    CURRENT_LOCATION_FALLBACK_LABEL
  );
};

export const mapGooglePlaceToLocation = (
  data: GooglePlaceData,
  details: GooglePlaceDetails | null,
): AppLocation | null => {
  const location = details?.geometry?.location;

  if (!location) {
    return null;
  }

  return {
    latitude: location.lat,
    longitude: location.lng,
    address: details?.formatted_address ?? data.description,
    city: null,
    country: null,
    countryCode: null,
  };
};

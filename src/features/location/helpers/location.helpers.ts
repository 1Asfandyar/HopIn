import type {
  AppLocation,
  GooglePlaceData,
  GooglePlaceDetails,
  LocationGeocodedAddress,
} from '@/types/types';
import { CURRENT_LOCATION_FALLBACK_LABEL } from '@/config/constants';
import { Linking } from 'react-native';

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
    address:
      details?.name ??
      details?.formatted_address ??
      data.structured_formatting?.main_text ??
      data.description,
    city: null,
    country: null,
    countryCode: null,
  };
};

const getLocationQuery = (location: AppLocation) => {
  if (location.address.trim()) {
    return location.address;
  }

  if (
    Number.isFinite(location.latitude) &&
    Number.isFinite(location.longitude)
  ) {
    return `${location.latitude},${location.longitude}`;
  }

  return location.address;
};

export const getMapsRouteUrl = (
  pickup: AppLocation,
  destination: AppLocation,
) => {
  const params = new URLSearchParams({
    api: '1',
    origin: getLocationQuery(pickup),
    destination: getLocationQuery(destination),
    travelmode: 'driving',
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

export const openRouteInMaps = async (
  pickup: AppLocation,
  destination: AppLocation,
) => {
  await Linking.openURL(getMapsRouteUrl(pickup, destination));
};

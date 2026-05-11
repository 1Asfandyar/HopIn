import type {
  AppLocation,
  GooglePlaceData,
  GooglePlaceDetails,
  LocationGeocodedAddress,
} from '@/types/types';
import { CURRENT_LOCATION_FALLBACK_LABEL } from '@/config/constants';
import { Linking } from 'react-native';
import {
  DEFAULT_CURRENT_LOCATION_MAP_REGION,
  DEFAULT_MAP_REGION,
} from '../constants/location.constants';
import type { MapCoordinate, MapRegion } from '../types';

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

export const getCoordinateFromRegion = (region: MapRegion): MapCoordinate => ({
  latitude: region.latitude,
  longitude: region.longitude,
});

export const createRegionForCoordinate = (
  coordinate: MapCoordinate,
  fallbackRegion: MapRegion = DEFAULT_CURRENT_LOCATION_MAP_REGION,
): MapRegion => ({
  ...fallbackRegion,
  latitude: coordinate.latitude,
  longitude: coordinate.longitude,
});

export const getDefaultRegionForCoordinate = (
  coordinate: MapCoordinate | null,
) => (coordinate ? DEFAULT_CURRENT_LOCATION_MAP_REGION : DEFAULT_MAP_REGION);

export const getDistanceInMeters = (
  from: MapCoordinate,
  to: MapCoordinate,
): number => {
  const earthRadiusMeters = 6371000;
  const degreesToRadians = Math.PI / 180;
  const fromLatitude = from.latitude * degreesToRadians;
  const toLatitude = to.latitude * degreesToRadians;
  const latitudeDelta = (to.latitude - from.latitude) * degreesToRadians;
  const longitudeDelta = (to.longitude - from.longitude) * degreesToRadians;
  const haversine =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  return (
    earthRadiusMeters *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
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

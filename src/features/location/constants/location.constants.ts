import type { MapRegion } from '../types';

export const LOCATION_SEARCH_MIN_QUERY_LENGTH = 3;
export const LOCATION_SEARCH_DEBOUNCE_MS = 450;
export const LOCATION_SEARCH_RADIUS_METERS = 50000;
export const LOCATION_SEARCH_CACHE_TTL_MS = 5 * 60 * 1000;
export const LOCATION_SEARCH_CACHE_MAX_ENTRIES = 40;
export const PLACE_DETAILS_CACHE_TTL_MS = 30 * 60 * 1000;
export const PLACE_DETAILS_CACHE_MAX_ENTRIES = 80;
export const MAP_PREVIEW_DELAY_MS = 1200;
export const MAP_PREVIEW_MIN_DISTANCE_METERS = 35;

export const DEFAULT_MAP_REGION: MapRegion = {
  latitude: 30.3753,
  longitude: 69.3451,
  latitudeDelta: 14,
  longitudeDelta: 14,
};

export const DEFAULT_CURRENT_LOCATION_MAP_REGION: MapRegion = {
  latitude: 31.5204,
  longitude: 74.3587,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

export const LOCATION_SELECTOR_COPY = {
  destinationPlaceholder: 'Where to?',
  pickupPlaceholder: 'Current Location',
  fromLabel: 'From',
  toLabel: 'To',
} as const;

export const MAP_LOCATION_PICKER_COPY = {
  routeTitle: 'Set ride details',
  pickupHeading: 'Pickup location',
  destinationHeading: 'Destination address',
  idleDescription: 'Select a location on the map',
  currentLocationButtonLabel: 'Use current location',
  confirmButtonLabel: 'Use this location',
} as const;

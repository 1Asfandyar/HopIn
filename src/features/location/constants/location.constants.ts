import type { MapRegion } from '../types';

export const LOCATION_SEARCH_MIN_QUERY_LENGTH = 3;
export const LOCATION_SEARCH_DEBOUNCE_MS = 300;
export const LOCATION_SEARCH_RADIUS_METERS = 50000;
export const MAP_PREVIEW_DELAY_MS = 2000;
export const LOCATION_SHEET_SNAP_POINTS = ['80%'] as const;
export const LOCATION_SELECTOR_CONTENT_Z_INDEX = 9999;

export const DEFAULT_MAP_REGION: MapRegion = {
  latitude: 31.5204,
  longitude: 74.3587,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const LOCATION_SELECTOR_COPY = {
  destinationPlaceholder: 'Where to?',
  pickupPlaceholder: 'Current Location',
  mapButtonLabel: 'Map',
  routeSummaryTitle: 'Ride details',
  fromLabel: 'From',
  toLabel: 'To',
  dateTimeLabel: 'Date & time',
  routePlaceholder: 'Choose your destination',
  dateTimePlaceholder: 'Choose your departure time',
} as const;

export const MAP_LOCATION_PICKER_COPY = {
  pickupTitle: 'Select current location',
  destinationTitle: 'Select destination',
  pickupHeading: 'Pickup location',
  destinationHeading: 'Destination address',
  idleDescription: 'Select a location on the map',
  currentLocationButtonLabel: 'Use current location',
  confirmButtonLabel: 'Done',
} as const;

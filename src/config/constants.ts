export const AUTH_SESSION_STORAGE_KEY = 'hopin.auth.session';
export const STARTUP_LOADER_MIN_MS = 12000;
export const AUTH_LOADER_MIN_MS = 6000;

export const CURRENT_LOCATION_FALLBACK_LABEL = 'Current location';

export const FEEDBACK_MESSAGES = {
  invalidRideDate: 'Please select today or a future date and time.',
  locationPermissionDenied: 'Location permission was denied.',
  locationUnavailable: 'Unable to get current location.',
  networkUnavailable: 'Unable to reach the server.',
  missingGooglePlacesKey: 'Google Places API key is missing.',
  currentLocationLoading: 'Detecting your current location...',
} as const;

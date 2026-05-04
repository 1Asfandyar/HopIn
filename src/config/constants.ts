export const AUTH_SESSION_STORAGE_KEY = 'hopin.auth.session';
export const MOCK_AUTH_DELAY_MS = 600;
export const MOCK_USER_ID = 'mock-user';
export const MOCK_ACCESS_TOKEN = 'mock-access-token';

export const CURRENT_LOCATION_FALLBACK_LABEL = 'Current location';

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
} as const;

export const FEEDBACK_MESSAGES = {
  invalidRideDate: 'Please select today or a future date and time.',
  locationPermissionDenied: 'Location permission was denied.',
  locationUnavailable: 'Unable to get current location.',
  loginFailed: 'Unable to log in.',
  registerFailed: 'Unable to register.',
  networkUnavailable: 'Unable to reach the server.',
  missingGooglePlacesKey: 'Google Places API key is missing.',
  currentLocationLoading: 'Detecting your current location...',
} as const;

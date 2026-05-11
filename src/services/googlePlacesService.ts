import { env } from '@/config/env';
import {
  LOCATION_SEARCH_CACHE_MAX_ENTRIES,
  LOCATION_SEARCH_CACHE_TTL_MS,
  LOCATION_SEARCH_MIN_QUERY_LENGTH,
  LOCATION_SEARCH_RADIUS_METERS,
  PLACE_DETAILS_CACHE_MAX_ENTRIES,
  PLACE_DETAILS_CACHE_TTL_MS,
} from '@/features/location/constants/location.constants';
import type {
  AppLocation,
  GooglePlaceData,
  GooglePlaceDetails,
} from '@/types/types';

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

type GoogleAutocompleteResponse = {
  status: string;
  predictions?: GooglePlaceData[];
};

type GooglePlaceDetailsResponse = {
  status: string;
  result?: GooglePlaceDetails;
};

const searchCache = new Map<string, CacheEntry<GooglePlaceData[]>>();
const detailsCache = new Map<string, CacheEntry<GooglePlaceDetails | null>>();

const normalizePlaceQuery = (query: string) =>
  query.trim().replace(/\s+/g, ' ');

const hasGooglePlacesApiKey = () => Boolean(env.googlePlacesApiKey.trim());

const assertGooglePlacesApiKey = () => {
  if (!hasGooglePlacesApiKey()) {
    throw new Error('Google Places API key is missing.');
  }
};

const getCachedValue = <T>(cache: Map<string, CacheEntry<T>>, key: string) => {
  const cached = cache.get(key);

  if (!cached) {
    return null;
  }

  if (cached.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }

  return cached.value;
};

const setCachedValue = <T>(
  cache: Map<string, CacheEntry<T>>,
  key: string,
  value: T,
  ttlMs: number,
  maxEntries: number,
) => {
  if (cache.size >= maxEntries) {
    const oldestKey = cache.keys().next().value;

    if (oldestKey) {
      cache.delete(oldestKey);
    }
  }

  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
};

const buildSearchCacheKey = (
  query: string,
  currentLocation: AppLocation | null,
) => {
  const countryCode = currentLocation?.countryCode ?? 'global';
  const locationBias = currentLocation
    ? `${currentLocation.latitude.toFixed(2)},${currentLocation.longitude.toFixed(2)}`
    : 'no-location';

  return `${query.toLowerCase()}|${countryCode}|${locationBias}`;
};

const buildAutocompleteParams = (
  query: string,
  currentLocation: AppLocation | null,
) =>
  new URLSearchParams({
    input: query,
    key: env.googlePlacesApiKey,
    language: 'en',
    ...(currentLocation && {
      location: `${currentLocation.latitude},${currentLocation.longitude}`,
      radius: String(LOCATION_SEARCH_RADIUS_METERS),
    }),
    ...(currentLocation?.countryCode && {
      components: `country:${currentLocation.countryCode}`,
    }),
  });

const buildPlaceDetailsParams = (placeId: string) =>
  new URLSearchParams({
    place_id: placeId,
    key: env.googlePlacesApiKey,
    language: 'en',
    fields: 'name,geometry,formatted_address,address_components,vicinity,types',
  });

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const googlePlacesService = {
  normalizeQuery: normalizePlaceQuery,
  hasApiKey: hasGooglePlacesApiKey,

  async searchAutocomplete(
    query: string,
    currentLocation: AppLocation | null,
  ): Promise<GooglePlaceData[]> {
    const normalizedQuery = normalizePlaceQuery(query);

    if (normalizedQuery.length < LOCATION_SEARCH_MIN_QUERY_LENGTH) {
      return [];
    }

    assertGooglePlacesApiKey();

    const cacheKey = buildSearchCacheKey(normalizedQuery, currentLocation);
    const cachedResults = getCachedValue(searchCache, cacheKey);

    if (cachedResults) {
      return cachedResults;
    }

    const params = buildAutocompleteParams(normalizedQuery, currentLocation);
    const data = await fetchJson<GoogleAutocompleteResponse>(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
    );

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    const predictions = data.predictions || [];

    setCachedValue(
      searchCache,
      cacheKey,
      predictions,
      LOCATION_SEARCH_CACHE_TTL_MS,
      LOCATION_SEARCH_CACHE_MAX_ENTRIES,
    );

    return predictions;
  },

  async getDetails(placeId: string): Promise<GooglePlaceDetails | null> {
    if (!placeId) {
      return null;
    }

    assertGooglePlacesApiKey();

    const cachedDetails = getCachedValue(detailsCache, placeId);

    if (cachedDetails) {
      return cachedDetails;
    }

    const params = buildPlaceDetailsParams(placeId);
    const data = await fetchJson<GooglePlaceDetailsResponse>(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
    );

    if (data.status !== 'OK') {
      throw new Error(`Google Places details API error: ${data.status}`);
    }

    const details = data.result || null;

    setCachedValue(
      detailsCache,
      placeId,
      details,
      PLACE_DETAILS_CACHE_TTL_MS,
      PLACE_DETAILS_CACHE_MAX_ENTRIES,
    );

    return details;
  },
};

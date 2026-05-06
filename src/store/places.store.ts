import { create } from 'zustand';
import type { PlacesStore } from '@/types/types';
import { useLocationStore } from './location.store';
import { env } from '@/config/env';
import { createAppError, getErrorMessage } from '@/utils/errors';
import { logger } from '@/services/logger';
import {
  LOCATION_SEARCH_CACHE_MAX_ENTRIES,
  LOCATION_SEARCH_CACHE_TTL_MS,
  LOCATION_SEARCH_MIN_QUERY_LENGTH,
  LOCATION_SEARCH_RADIUS_METERS,
  PLACE_DETAILS_CACHE_MAX_ENTRIES,
  PLACE_DETAILS_CACHE_TTL_MS,
} from '@/features/location/constants/location.constants';
import type { GooglePlaceData, GooglePlaceDetails } from '@/types/types';

let searchRequestId = 0;

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const searchCache = new Map<string, CacheEntry<GooglePlaceData[]>>();
const detailsCache = new Map<string, CacheEntry<GooglePlaceDetails | null>>();

const normalizeQuery = (query: string) => query.trim().replace(/\s+/g, ' ');

const buildSearchCacheKey = (query: string) => {
  const currentLocation = useLocationStore.getState().currentLocation;
  const countryCode = currentLocation?.countryCode ?? 'global';
  const locationBias = currentLocation
    ? `${currentLocation.latitude.toFixed(2)},${currentLocation.longitude.toFixed(2)}`
    : 'no-location';

  return `${query.toLowerCase()}|${countryCode}|${locationBias}`;
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

export const usePlacesStore = create<PlacesStore>(set => ({
  searchResults: [],
  isLoading: false,
  error: null,

  searchPlaces: async (query: string) => {
    const normalizedQuery = normalizeQuery(query);

    if (
      !normalizedQuery ||
      normalizedQuery.length < LOCATION_SEARCH_MIN_QUERY_LENGTH
    ) {
      set({ searchResults: [], error: null });
      return [];
    }

    if (!env.googlePlacesApiKey.trim()) {
      const appError = createAppError(
        'CONFIG_MISSING',
        'Google Places API key is missing.',
      );

      set({ searchResults: [], isLoading: false, error: appError });
      return [];
    }

    const cacheKey = buildSearchCacheKey(normalizedQuery);
    const cachedResults = getCachedValue(searchCache, cacheKey);

    if (cachedResults) {
      set({ searchResults: cachedResults, isLoading: false, error: null });
      return cachedResults;
    }

    const requestId = searchRequestId + 1;
    searchRequestId = requestId;

    set({ isLoading: true, error: null });

    try {
      const currentLocation = useLocationStore.getState().currentLocation;
      const params = new URLSearchParams({
        input: normalizedQuery,
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

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
      );

      const data = await response.json();

      if (requestId !== searchRequestId) {
        return [];
      }

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status}`);
      }

      set({
        searchResults: data.predictions || [],
        isLoading: false,
      });

      setCachedValue(
        searchCache,
        cacheKey,
        data.predictions || [],
        LOCATION_SEARCH_CACHE_TTL_MS,
        LOCATION_SEARCH_CACHE_MAX_ENTRIES,
      );

      return data.predictions || [];
    } catch (error) {
      if (requestId !== searchRequestId) {
        return [];
      }

      const appError = createAppError(
        'PLACES_SEARCH_FAILED',
        getErrorMessage(error, 'Failed to search places'),
      );

      logger.error('Places search failed', error);

      set({
        error: appError,
        isLoading: false,
        searchResults: [],
      });

      return [];
    }
  },

  getPlaceDetailsById: async (placeId: string) => {
    if (!placeId) {
      return null;
    }

    const cachedDetails = getCachedValue(detailsCache, placeId);

    if (cachedDetails) {
      return cachedDetails;
    }

    if (!env.googlePlacesApiKey.trim()) {
      const appError = createAppError(
        'CONFIG_MISSING',
        'Google Places API key is missing.',
      );

      set({ error: appError, isLoading: false });
      return null;
    }

    try {
      const params = new URLSearchParams({
        place_id: placeId,
        key: env.googlePlacesApiKey,
        language: 'en',
        fields:
          'name,geometry,formatted_address,address_components,vicinity,types',
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
      );

      const data = await response.json();

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
    } catch (error) {
      const appError = createAppError(
        'PLACE_DETAILS_FAILED',
        getErrorMessage(error, 'Failed to fetch place details'),
      );

      logger.error('Place details failed', error);

      set({ error: appError, isLoading: false });

      return null;
    }
  },

  clearResults: () => {
    set({
      searchResults: [],
      error: null,
      isLoading: false,
    });
  },
}));

export const selectSearchResults = (state: PlacesStore) => state.searchResults;
export const selectPlacesLoading = (state: PlacesStore) => state.isLoading;
export const selectPlacesError = (state: PlacesStore) => state.error;

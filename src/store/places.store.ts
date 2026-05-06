import { create } from 'zustand';
import type { PlacesStore } from '@/types/types';
import { useLocationStore } from './location.store';
import { env } from '@/config/env';
import { createAppError, getErrorMessage } from '@/utils/errors';
import { logger } from '@/services/logger';
import { LOCATION_SEARCH_RADIUS_METERS } from '@/features/location/constants/location.constants';

export const usePlacesStore = create<PlacesStore>(set => ({
  searchResults: [],
  isLoading: false,
  error: null,

  searchPlaces: async (query: string) => {
    if (!query || query.length < 3) {
      set({ searchResults: [], error: null });
      return [];
    }

    set({ isLoading: true, error: null });

    try {
      const currentLocation = useLocationStore.getState().currentLocation;
      const params = new URLSearchParams({
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

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
      );

      const data = await response.json();

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status}`);
      }

      set({
        searchResults: data.predictions || [],
        isLoading: false,
      });

      return data.predictions || [];
    } catch (error) {
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

    try {
      const params = new URLSearchParams({
        place_id: placeId,
        key: env.googlePlacesApiKey,
        language: 'en',
        fields: 'name,geometry,formatted_address,address_components,vicinity,types',
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
      );

      const data = await response.json();

      if (data.status !== 'OK') {
        throw new Error(`Google Places details API error: ${data.status}`);
      }

      return data.result || null;
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

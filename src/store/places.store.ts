import { create } from 'zustand';
import type { PlacesStore } from '@/types/types';
import { useLocationStore } from './location.store';
import { createAppError, getErrorMessage } from '@/utils/errors';
import { logger } from '@/services/logger';
import { googlePlacesService } from '@/services/googlePlacesService';
import { LOCATION_SEARCH_MIN_QUERY_LENGTH } from '@/features/location/constants/location.constants';

let searchRequestId = 0;

export const usePlacesStore = create<PlacesStore>(set => ({
  searchResults: [],
  isLoading: false,
  error: null,

  searchPlaces: async (query: string) => {
    const normalizedQuery = googlePlacesService.normalizeQuery(query);

    if (
      !normalizedQuery ||
      normalizedQuery.length < LOCATION_SEARCH_MIN_QUERY_LENGTH
    ) {
      set({ searchResults: [], error: null });
      return [];
    }

    if (!googlePlacesService.hasApiKey()) {
      const appError = createAppError(
        'CONFIG_MISSING',
        'Google Places API key is missing.',
      );

      set({ searchResults: [], isLoading: false, error: appError });
      return [];
    }

    const requestId = searchRequestId + 1;
    searchRequestId = requestId;

    set({ isLoading: true, error: null });

    try {
      const currentLocation = useLocationStore.getState().currentLocation;
      const searchResults = await googlePlacesService.searchAutocomplete(
        normalizedQuery,
        currentLocation,
      );

      if (requestId !== searchRequestId) {
        return [];
      }

      set({
        searchResults,
        isLoading: false,
      });

      return searchResults;
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

    if (!googlePlacesService.hasApiKey()) {
      const appError = createAppError(
        'CONFIG_MISSING',
        'Google Places API key is missing.',
      );

      set({ error: appError, isLoading: false });
      return null;
    }

    try {
      return await googlePlacesService.getDetails(placeId);
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

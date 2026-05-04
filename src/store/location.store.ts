import { create } from 'zustand';
import { locationService } from '@/services/locationService';
import { logger } from '@/services/logger';
import type { AppError, LocationStore } from '@/types/types';
import { createAppError, getErrorMessage } from '@/utils/errors';

export const useLocationStore = create<LocationStore>(set => ({
  currentLocation: null,
  error: null,
  isLoading: false,

  setCurrentLocation: location => {
    set({ currentLocation: location, error: null });
  },

  fetchCurrentLocation: async () => {
    set({ error: null, isLoading: true });

    try {
      const currentLocation = await locationService.getCurrentLocation();
      set({ currentLocation, isLoading: false });

      return currentLocation;
    } catch (error) {
      const appError =
        typeof error === 'object' && error && 'code' in error
          ? (error as AppError)
          : createAppError(
              'LOCATION_GEOCODE_FAILED',
              getErrorMessage(error, 'Unable to get current location.'),
              error,
            );

      logger.error('Current location lookup failed', error);
      set({ error: appError, isLoading: false });

      return null;
    }
  },
}));

export const selectCurrentLocation = (state: LocationStore) =>
  state.currentLocation;
export const selectLocationError = (state: LocationStore) => state.error;
export const selectLocationLoading = (state: LocationStore) => state.isLoading;

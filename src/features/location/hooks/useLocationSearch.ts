import { useMemo } from 'react';
import {
  selectCurrentLocation,
  selectLocationError,
  selectLocationLoading,
  useLocationStore,
} from '@/store/location.store';
import { hasGooglePlacesApiKey } from '@/config/env';
import { LOCATION_SEARCH_RADIUS_METERS } from '../constants/location.constants';

export const useLocationSearch = () => {
  const currentLocation = useLocationStore(selectCurrentLocation);
  const error = useLocationStore(selectLocationError);
  const isLoading = useLocationStore(selectLocationLoading);

  const queryBias = useMemo(
    () =>
      currentLocation
        ? {
            location: `${currentLocation.latitude},${currentLocation.longitude}`,
            radius: LOCATION_SEARCH_RADIUS_METERS,
          }
        : {},
    [currentLocation],
  );

  const countryRestriction = useMemo(
    () =>
      currentLocation?.countryCode
        ? {
            components: `country:${currentLocation.countryCode}`,
          }
        : {},
    [currentLocation?.countryCode],
  );

  return {
    currentLocation,
    countryRestriction,
    error,
    hasGooglePlacesApiKey,
    isLoading,
    queryBias,
  };
};

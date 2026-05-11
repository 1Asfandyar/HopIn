import {
  selectCurrentLocation,
  selectLocationError,
  selectLocationLoading,
  useLocationStore,
} from '@/store/location.store';
import { hasGooglePlacesApiKey } from '@/config/env';

export const useLocationSearch = () => {
  const currentLocation = useLocationStore(selectCurrentLocation);
  const error = useLocationStore(selectLocationError);
  const isLoading = useLocationStore(selectLocationLoading);

  return {
    currentLocation,
    error,
    hasGooglePlacesApiKey,
    isLoading,
  };
};

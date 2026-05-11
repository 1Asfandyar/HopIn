import { useCallback, useState } from 'react';
import { savedLocationsService } from '@/services/savedLocationsService';
import type { SavedLocation } from '@/types/types';

export const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isLoadingSavedLocations, setIsLoadingSavedLocations] = useState(false);

  const loadSavedLocations = useCallback(async () => {
    setIsLoadingSavedLocations(true);

    try {
      const locations = await savedLocationsService.list();
      setSavedLocations(locations);
    } catch {
      setSavedLocations([]);
    } finally {
      setIsLoadingSavedLocations(false);
    }
  }, []);

  return {
    savedLocations,
    isLoadingSavedLocations,
    loadSavedLocations,
  };
};

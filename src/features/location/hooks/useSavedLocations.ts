import { useCallback, useState } from 'react';
import { savedLocationsService } from '@/services/savedLocationsService';
import type {
  AppLocation,
  SavedLocation,
  SavedLocationKind,
} from '@/types/types';

export const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isLoadingSavedLocations, setIsLoadingSavedLocations] = useState(false);
  const [isSavingLocation, setIsSavingLocation] = useState(false);

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

  const saveLocation = useCallback(
    async (label: string, kind: SavedLocationKind, location: AppLocation) => {
      setIsSavingLocation(true);

      try {
        const savedLocation = await savedLocationsService.save({
          label,
          kind,
          location,
        });

        setSavedLocations(currentLocations => {
          const existingIndex = currentLocations.findIndex(
            item => item.id === savedLocation.id || item.label === label,
          );

          if (existingIndex === -1) {
            return [...currentLocations, savedLocation];
          }

          return currentLocations.map((item, index) =>
            index === existingIndex ? savedLocation : item,
          );
        });
      } finally {
        setIsSavingLocation(false);
      }
    },
    [],
  );

  return {
    savedLocations,
    isLoadingSavedLocations,
    isSavingLocation,
    loadSavedLocations,
    saveLocation,
  };
};

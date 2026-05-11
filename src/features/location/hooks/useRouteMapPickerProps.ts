import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import type { RideFlowMode } from '@/types/types';
import { useLocationSelector } from './useLocationSelector';

type UseRouteMapPickerPropsParams = {
  flowMode: RideFlowMode;
  resetDraftOnBlur?: boolean;
  useCurrentLocationAsPickup?: boolean;
  deferMapSelectionUntilConfirm?: boolean;
};

export const useRouteMapPickerProps = ({
  flowMode,
  resetDraftOnBlur = true,
  useCurrentLocationAsPickup = true,
  deferMapSelectionUntilConfirm = false,
}: UseRouteMapPickerPropsParams) => {
  const { resetDraft } = useRideDraft();
  const locationSelector = useLocationSelector({
    useCurrentLocationAsPickup,
    deferMapSelectionUntilConfirm,
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (resetDraftOnBlur) {
          resetDraft();
        }
      };
    }, [resetDraft, resetDraftOnBlur]),
  );

  return {
    flowMode,
    activeInput: locationSelector.activeInput,
    pickupQuery: locationSelector.pickupQuery,
    destinationQuery: locationSelector.destinationQuery,
    searchResults: locationSelector.searchResults,
    isSearchingPlaces: locationSelector.isSearchingPlaces,
    placesError: locationSelector.placesError,
    pickup: locationSelector.pickup,
    destination: locationSelector.destination,
    savedLocations: locationSelector.savedLocations,
    isLoadingSavedLocations: locationSelector.isLoadingSavedLocations,
    locationError: locationSelector.locationError,
    hasGooglePlacesApiKey: locationSelector.hasGooglePlacesApiKey,
    isLoadingCurrentLocation: locationSelector.isLoadingCurrentLocation,
    shouldShowResults: locationSelector.shouldShowResults,
    mapPickerInput: locationSelector.mapPickerInput,
    mapRegion: locationSelector.mapRegion,
    mapCameraRequestKey: locationSelector.mapCameraRequestKey,
    mapPreviewLocation: locationSelector.mapPreviewLocation,
    mapError: locationSelector.mapError,
    isWaitingForMapPreview: locationSelector.isWaitingForMapPreview,
    isLoadingMapPreview: locationSelector.isLoadingMapPreview,
    onPickupChange: locationSelector.setPickupQuery,
    onDestinationChange: locationSelector.setDestinationQuery,
    onLocationInputClear: locationSelector.clearLocationInput,
    onActiveInputChange: locationSelector.setActiveInput,
    onOpenRouteMap: locationSelector.openRouteMapPicker,
    onCloseMapPicker: locationSelector.closeMapPicker,
    onMapRegionChange: locationSelector.onMapRegionChange,
    onUseDeviceLocationOnMap: locationSelector.useDeviceLocationOnMap,
    onConfirmRouteMapLocation: locationSelector.confirmRouteMapLocation,
    onPlaceSelected: locationSelector.handlePlaceSelected,
    onSavedLocationSelected: locationSelector.onSavedLocationSelected,
  };
};

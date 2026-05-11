import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import type { RideFlowMode } from '@/types/types';
import type { LocationSelectorViewProps } from '../types';
import { useLocationSelector } from './useLocationSelector';

type UseLocationSelectorScreenPropsParams = {
  flowMode: RideFlowMode;
  roleLabel: string;
  heading: string;
  description: string;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: () => void;
  isSubmitting: boolean;
  resetDraftOnBlur?: boolean;
  useCurrentLocationAsPickup?: boolean;
  deferMapSelectionUntilConfirm?: boolean;
};

export const useLocationSelectorScreenProps = ({
  flowMode,
  roleLabel,
  heading,
  description,
  submitLabel,
  submittingLabel,
  onSubmit,
  isSubmitting,
  resetDraftOnBlur = true,
  useCurrentLocationAsPickup = true,
  deferMapSelectionUntilConfirm = false,
}: UseLocationSelectorScreenPropsParams): LocationSelectorViewProps => {
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
    roleLabel,
    heading,
    description,
    submitLabel,
    submittingLabel,
    onSubmit,
    isSubmitting,
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
    isSavingLocation: locationSelector.isSavingLocation,
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
    isConfirmingMapLocation: locationSelector.isConfirmingMapLocation,
    dateTime: locationSelector.rideDateTime.dateTime,
    isDateTimePickerOpen: locationSelector.rideDateTime.isOpen,
    minDateTime: locationSelector.rideDateTime.minDateTime,
    formatDateAndTime: locationSelector.rideDateTime.formatDateAndTime,
    onPickupChange: locationSelector.setPickupQuery,
    onDestinationChange: locationSelector.setDestinationQuery,
    onLocationInputClear: locationSelector.clearLocationInput,
    onActiveInputChange: locationSelector.setActiveInput,
    onOpenRouteMap: locationSelector.openRouteMapPicker,
    onOpenLocationMap: locationSelector.openMapPicker,
    onOpenDateTimePicker: locationSelector.rideDateTime.openDateTimePicker,
    onCloseDateTimePicker: locationSelector.rideDateTime.closeDateTimePicker,
    onDateTimeConfirm: locationSelector.handleDateTimeConfirm,
    onCloseMapPicker: locationSelector.closeMapPicker,
    onMapRegionChange: locationSelector.onMapRegionChange,
    onUseDeviceLocationOnMap: locationSelector.useDeviceLocationOnMap,
    onConfirmMapLocation: locationSelector.confirmMapLocation,
    onConfirmRouteMapLocation: locationSelector.confirmRouteMapLocation,
    onPlaceSelected: locationSelector.handlePlaceSelected,
    onSavedLocationSelected: locationSelector.onSavedLocationSelected,
    onSaveLocation: locationSelector.saveLocation,
  };
};

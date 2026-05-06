import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import type { LocationSelectorViewProps } from '../types';
import { useLocationSelector } from './useLocationSelector';

export const useLocationSelectorScreenProps = (): LocationSelectorViewProps => {
  const insets = useSafeAreaInsets();
  const { resetDraft } = useRideDraft();
  const locationSelector = useLocationSelector();

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetDraft();
      };
    }, [resetDraft]),
  );

  return {
    bottomSheetRef: locationSelector.bottomSheetRef,
    snapPoints: locationSelector.snapPoints,
    topInset: insets.top,
    activeInput: locationSelector.activeInput,
    pickupQuery: locationSelector.pickupQuery,
    destinationQuery: locationSelector.destinationQuery,
    searchResults: locationSelector.searchResults,
    isSearchingPlaces: locationSelector.isSearchingPlaces,
    placesError: locationSelector.placesError,
    pickup: locationSelector.currentLocation,
    destination: locationSelector.destination,
    locationError: locationSelector.locationError,
    hasGooglePlacesApiKey: locationSelector.hasGooglePlacesApiKey,
    isLoadingCurrentLocation: locationSelector.isLoadingCurrentLocation,
    canCloseLocationSheet: locationSelector.canCloseLocationSheet,
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
    onActiveInputChange: locationSelector.setActiveInput,
    onOpenLocationSheet: locationSelector.openLocationSheet,
    onOpenDateTimePicker: locationSelector.rideDateTime.openDateTimePicker,
    onCloseDateTimePicker: locationSelector.rideDateTime.closeDateTimePicker,
    onDateTimeConfirm: locationSelector.handleDateTimeConfirm,
    onOpenMapPicker: locationSelector.openMapPicker,
    onCloseMapPicker: locationSelector.closeMapPicker,
    onMapRegionChange: locationSelector.onMapRegionChange,
    onUseDeviceLocationOnMap: locationSelector.useDeviceLocationOnMap,
    onConfirmMapLocation: locationSelector.confirmMapLocation,
    onPlaceSelected: locationSelector.handlePlaceSelected,
  };
};

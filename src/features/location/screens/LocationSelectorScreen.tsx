import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocationSelector } from '../hooks/useLocationSelector';
import LocationSelector from '../components/LocationSelector';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';

const LocationSelectorScreen = () => {
  const insets = useSafeAreaInsets();
  const { resetDraft } = useRideDraft();
  const {
    bottomSheetRef,
    snapPoints,
    activeInput,
    pickupQuery,
    destinationQuery,
    searchResults,
    isSearchingPlaces,
    placesError,
    currentLocation,
    destination,
    locationError,
    hasGooglePlacesApiKey,
    isLoadingCurrentLocation,
    canCloseLocationSheet,
    shouldShowResults,
    mapPickerInput,
    mapRegion,
    mapPreviewLocation,
    mapError,
    isWaitingForMapPreview,
    isLoadingMapPreview,
    isConfirmingMapLocation,
    rideDateTime,
    setPickupQuery,
    setDestinationQuery,
    setActiveInput,
    openLocationSheet,
    openMapPicker,
    closeMapPicker,
    handleDateTimeConfirm,
    onMapRegionChange,
    useDeviceLocationOnMap,
    confirmMapLocation,
    handlePlaceSelected,
  } = useLocationSelector();

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetDraft();
      };
    }, [resetDraft]),
  );

  return (
    <LocationSelector
      bottomSheetRef={bottomSheetRef}
      snapPoints={snapPoints}
      topInset={insets.top}
      activeInput={activeInput}
      pickupQuery={pickupQuery}
      destinationQuery={destinationQuery}
      searchResults={searchResults}
      isSearchingPlaces={isSearchingPlaces}
      placesError={placesError}
      pickup={currentLocation}
      destination={destination}
      locationError={locationError}
      hasGooglePlacesApiKey={hasGooglePlacesApiKey}
      isLoadingCurrentLocation={isLoadingCurrentLocation}
      canCloseLocationSheet={canCloseLocationSheet}
      shouldShowResults={shouldShowResults}
      mapPickerInput={mapPickerInput}
      mapRegion={mapRegion}
      mapPreviewLocation={mapPreviewLocation}
      mapError={mapError}
      isWaitingForMapPreview={isWaitingForMapPreview}
      isLoadingMapPreview={isLoadingMapPreview}
      isConfirmingMapLocation={isConfirmingMapLocation}
      dateTime={rideDateTime.dateTime}
      isDateTimePickerOpen={rideDateTime.isOpen}
      minDateTime={rideDateTime.minDateTime}
      formatDateAndTime={rideDateTime.formatDateAndTime}
      onPickupChange={setPickupQuery}
      onDestinationChange={setDestinationQuery}
      onActiveInputChange={setActiveInput}
      onOpenLocationSheet={openLocationSheet}
      onOpenDateTimePicker={rideDateTime.openDateTimePicker}
      onCloseDateTimePicker={rideDateTime.closeDateTimePicker}
      onDateTimeConfirm={handleDateTimeConfirm}
      onOpenMapPicker={openMapPicker}
      onCloseMapPicker={closeMapPicker}
      onMapRegionChange={onMapRegionChange}
      onUseDeviceLocationOnMap={useDeviceLocationOnMap}
      onConfirmMapLocation={confirmMapLocation}
      onPlaceSelected={handlePlaceSelected}
    />
  );
};

export default LocationSelectorScreen;

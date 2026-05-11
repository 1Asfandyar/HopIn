import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { APP_ROUTES } from '@/constants/appRoutes';
import { USER_ROLES } from '@/constants/roles';
import MapLocationPicker from '@/features/location/components/MapLocationPicker';
import { useLocationSelectorScreenProps } from '@/features/location/hooks/useLocationSelectorScreenProps';
import { RIDE_MATCHING_COPY } from '@/features/rides/constants/rideMatching.constants';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import { useAuthStore } from '@/store/auth.store';
import type { RideFlowMode } from '@/types/types';

const SetRideDetails = () => {
  const router = useRouter();
  const didOpenMapRef = useRef(false);
  const user = useAuthStore(state => state.user);
  const { resetDraft } = useRideDraft();
  const flowMode: RideFlowMode =
    user?.role === USER_ROLES.driver ? 'offer' : 'find';
  const copy = RIDE_MATCHING_COPY[flowMode];
  const locationSelector = useLocationSelectorScreenProps({
    flowMode,
    roleLabel: '',
    heading: '',
    description: '',
    submitLabel: copy.mapDoneLabel,
    submittingLabel: copy.mapDoneLabel,
    onSubmit: () => router.push(APP_ROUTES.main.rideResults),
    isSubmitting: false,
    resetDraftOnBlur: false,
    useCurrentLocationAsPickup: false,
    deferMapSelectionUntilConfirm: true,
  });
  const canContinue = Boolean(
    locationSelector.pickup && locationSelector.destination,
  );
  const handleRouteDone = () => {
    locationSelector.onCloseMapPicker();
    requestAnimationFrame(() => {
      router.push(APP_ROUTES.main.rideResults);
    });
  };

  useEffect(() => {
    if (didOpenMapRef.current) {
      return;
    }

    didOpenMapRef.current = true;
    locationSelector.onOpenRouteMap();
  }, [locationSelector]);

  return (
    <View className="flex-1 bg-white">
      <BrandedLoader variant="inline" label="Opening map..." />
      <MapLocationPicker
        visible={locationSelector.mapPickerInput !== null}
        flowMode={locationSelector.flowMode}
        inputType={locationSelector.mapPickerInput}
        activeInput={locationSelector.activeInput}
        pickupQuery={locationSelector.pickupQuery}
        destinationQuery={locationSelector.destinationQuery}
        pickup={locationSelector.pickup}
        destination={locationSelector.destination}
        searchResults={locationSelector.searchResults}
        isSearchingPlaces={locationSelector.isSearchingPlaces}
        placesError={locationSelector.placesError}
        shouldShowResults={locationSelector.shouldShowResults}
        savedLocations={locationSelector.savedLocations}
        isLoadingSavedLocations={locationSelector.isLoadingSavedLocations}
        locationError={locationSelector.locationError}
        hasGooglePlacesApiKey={locationSelector.hasGooglePlacesApiKey}
        isLoadingCurrentLocation={locationSelector.isLoadingCurrentLocation}
        region={locationSelector.mapRegion}
        cameraRequestKey={locationSelector.mapCameraRequestKey}
        previewLocation={locationSelector.mapPreviewLocation}
        isWaitingForPreview={locationSelector.isWaitingForMapPreview}
        isLoadingPreview={locationSelector.isLoadingMapPreview}
        isConfirming={locationSelector.isConfirmingMapLocation}
        error={locationSelector.mapError}
        onPickupChange={locationSelector.onPickupChange}
        onDestinationChange={locationSelector.onDestinationChange}
        onLocationInputClear={locationSelector.onLocationInputClear}
        onActiveInputChange={locationSelector.onActiveInputChange}
        onPlaceSelected={locationSelector.onPlaceSelected}
        onSavedLocationSelected={locationSelector.onSavedLocationSelected}
        onRegionChange={locationSelector.onMapRegionChange}
        onUseCurrentLocation={locationSelector.onUseDeviceLocationOnMap}
        onConfirm={locationSelector.onConfirmRouteMapLocation}
        onClose={() => {
          resetDraft();
          router.back();
        }}
        routeActionLabel={copy.mapDoneLabel}
        routeActionDisabled={!canContinue}
        onRouteAction={handleRouteDone}
      />
    </View>
  );
};

export default SetRideDetails;

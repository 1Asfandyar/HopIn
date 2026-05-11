import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { APP_ROUTES } from '@/constants/appRoutes';
import { USER_ROLES } from '@/constants/roles';
import MapLocationPicker from '@/features/location/components/MapLocationPicker';
import { useRouteMapPickerProps } from '@/features/location/hooks/useRouteMapPickerProps';
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
  const routeMapPicker = useRouteMapPickerProps({
    flowMode,
    resetDraftOnBlur: false,
    useCurrentLocationAsPickup: false,
    deferMapSelectionUntilConfirm: true,
  });
  const canContinue = Boolean(
    routeMapPicker.pickup && routeMapPicker.destination,
  );
  const openRouteMap = routeMapPicker.onOpenRouteMap;
  const handleRouteDone = () => {
    routeMapPicker.onCloseMapPicker();
    requestAnimationFrame(() => {
      router.push(APP_ROUTES.main.rideResults);
    });
  };

  useEffect(() => {
    if (didOpenMapRef.current) {
      return;
    }

    didOpenMapRef.current = true;
    openRouteMap();
  }, [openRouteMap]);

  return (
    <View className="flex-1 bg-white">
      <BrandedLoader variant="inline" label="Opening map..." />
      <MapLocationPicker
        visible={routeMapPicker.mapPickerInput !== null}
        flowMode={routeMapPicker.flowMode}
        inputType={routeMapPicker.mapPickerInput}
        activeInput={routeMapPicker.activeInput}
        pickupQuery={routeMapPicker.pickupQuery}
        destinationQuery={routeMapPicker.destinationQuery}
        pickup={routeMapPicker.pickup}
        destination={routeMapPicker.destination}
        searchResults={routeMapPicker.searchResults}
        isSearchingPlaces={routeMapPicker.isSearchingPlaces}
        placesError={routeMapPicker.placesError}
        shouldShowResults={routeMapPicker.shouldShowResults}
        savedLocations={routeMapPicker.savedLocations}
        isLoadingSavedLocations={routeMapPicker.isLoadingSavedLocations}
        locationError={routeMapPicker.locationError}
        hasGooglePlacesApiKey={routeMapPicker.hasGooglePlacesApiKey}
        isLoadingCurrentLocation={routeMapPicker.isLoadingCurrentLocation}
        region={routeMapPicker.mapRegion}
        cameraRequestKey={routeMapPicker.mapCameraRequestKey}
        previewLocation={routeMapPicker.mapPreviewLocation}
        isWaitingForPreview={routeMapPicker.isWaitingForMapPreview}
        isLoadingPreview={routeMapPicker.isLoadingMapPreview}
        error={routeMapPicker.mapError}
        onPickupChange={routeMapPicker.onPickupChange}
        onDestinationChange={routeMapPicker.onDestinationChange}
        onLocationInputClear={routeMapPicker.onLocationInputClear}
        onActiveInputChange={routeMapPicker.onActiveInputChange}
        onPlaceSelected={routeMapPicker.onPlaceSelected}
        onSavedLocationSelected={routeMapPicker.onSavedLocationSelected}
        onRegionChange={routeMapPicker.onMapRegionChange}
        onUseCurrentLocation={routeMapPicker.onUseDeviceLocationOnMap}
        onConfirm={routeMapPicker.onConfirmRouteMapLocation}
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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRideDateTime } from '@/features/rides/hooks/useRideDateTime';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import { useLocationStore } from '@/store/location.store';
import {
  selectPlacesError,
  selectPlacesLoading,
  selectSearchResults,
  usePlacesStore,
} from '@/store/places.store';
import { currentLocationService } from '@/services/currentLocationService';
import { createAppError, getErrorMessage } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import { isFutureDateTime } from '@/utils/date';
import type {
  AppLocation,
  GooglePlaceData,
  GooglePlaceDetails,
} from '@/types/types';
import type { ActiveLocationInput, MapCoordinate, MapRegion } from '../types';
import {
  DEFAULT_MAP_REGION,
  LOCATION_SEARCH_DEBOUNCE_MS,
  LOCATION_SEARCH_MIN_QUERY_LENGTH,
  LOCATION_SHEET_SNAP_POINTS,
  MAP_PREVIEW_DELAY_MS,
  MAP_PREVIEW_MIN_DISTANCE_METERS,
} from '../constants/location.constants';
import { mapGooglePlaceToLocation } from '../helpers/location.helpers';
import { useLocationSearch } from './useLocationSearch';

export const useLocationSelector = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const mapPreviewRequestRef = useRef(0);
  const lastQueuedMapPreviewCoordinateRef = useRef<MapCoordinate | null>(null);
  const mapPreviewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const snapPoints = useMemo(() => [...LOCATION_SHEET_SNAP_POINTS], []);
  const [activeInput, setActiveInput] = useState<ActiveLocationInput | null>(
    null,
  );
  const [pickupQuery, setPickupQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [mapPickerInput, setMapPickerInput] =
    useState<ActiveLocationInput | null>(null);
  const [, setMapCoordinate] = useState<MapCoordinate>({
    latitude: DEFAULT_MAP_REGION.latitude,
    longitude: DEFAULT_MAP_REGION.longitude,
  });
  const [mapRegion, setMapRegion] = useState<MapRegion>(DEFAULT_MAP_REGION);
  const [mapCameraRequestKey, setMapCameraRequestKey] = useState(0);
  const [mapPreviewLocation, setMapPreviewLocation] =
    useState<AppLocation | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isWaitingForMapPreview, setIsWaitingForMapPreview] = useState(false);
  const [isLoadingMapPreview, setIsLoadingMapPreview] = useState(false);
  const [isConfirmingMapLocation, setIsConfirmingMapLocation] = useState(false);
  const setCurrentLocation = useLocationStore(
    state => state.setCurrentLocation,
  );
  const fetchCurrentLocation = useLocationStore(
    state => state.fetchCurrentLocation,
  );
  const searchResults = usePlacesStore(selectSearchResults);
  const isSearchingPlaces = usePlacesStore(selectPlacesLoading);
  const placesError = usePlacesStore(selectPlacesError);
  const searchPlaces = usePlacesStore(state => state.searchPlaces);
  const getPlaceDetailsById = usePlacesStore(
    state => state.getPlaceDetailsById,
  );
  const clearResults = usePlacesStore(state => state.clearResults);
  const {
    currentLocation,
    error: locationSearchError,
    hasGooglePlacesApiKey,
    isLoading,
  } = useLocationSearch();
  const { pickup, destination, setDestination, setPickup } = useRideDraft();
  const rideDateTime = useRideDateTime();

  useEffect(() => {
    if (activeInput !== 'pickup') {
      setPickupQuery(currentLocation?.address ?? '');
    }
  }, [activeInput, currentLocation?.address]);

  useEffect(() => {
    if (activeInput !== 'destination') {
      setDestinationQuery(destination?.address ?? '');
    }
  }, [activeInput, destination?.address]);

  const activeQuery =
    activeInput === 'pickup'
      ? pickupQuery
      : activeInput === 'destination'
        ? destinationQuery
        : '';
  const hasCompletedRideDetails = Boolean(
    pickup && destination && rideDateTime.dateTime,
  );
  const canCloseLocationSheet = hasCompletedRideDetails;
  const shouldShowResults =
    activeInput !== null &&
    activeQuery.trim().length >= LOCATION_SEARCH_MIN_QUERY_LENGTH;
  const selectedActiveAddress =
    activeInput === 'pickup'
      ? (currentLocation?.address ?? pickup?.address)
      : activeInput === 'destination'
        ? destination?.address
        : null;

  useEffect(() => {
    const trimmedQuery = activeQuery.trim();

    if (
      !activeInput ||
      trimmedQuery.length < LOCATION_SEARCH_MIN_QUERY_LENGTH ||
      trimmedQuery === selectedActiveAddress
    ) {
      clearResults();
      return;
    }

    const timer = setTimeout(() => {
      searchPlaces(trimmedQuery);
    }, LOCATION_SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [
    activeInput,
    activeQuery,
    clearResults,
    searchPlaces,
    selectedActiveAddress,
  ]);

  const openLocationSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeLocationSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const applyPickupLocation = useCallback(
    (location: AppLocation) => {
      setCurrentLocation(location);
      setPickup(location);
      setPickupQuery(location.address);
    },
    [setCurrentLocation, setPickup],
  );

  const applyDestinationLocation = useCallback(
    (location: AppLocation) => {
      setDestination(location);
      setDestinationQuery(location.address);
    },
    [setDestination],
  );

  const applyLocation = useCallback(
    (input: ActiveLocationInput, location: AppLocation) => {
      if (input === 'pickup') {
        applyPickupLocation(location);
        return;
      }

      applyDestinationLocation(location);
    },
    [applyDestinationLocation, applyPickupLocation],
  );

  const mapPlaceSelectionToLocation = useCallback(
    (
      input: ActiveLocationInput,
      data: GooglePlaceData,
      details: GooglePlaceDetails | null,
    ) => {
      const location = mapGooglePlaceToLocation(data, details);

      if (!location) {
        return false;
      }

      applyLocation(input, location);
      return true;
    },
    [applyLocation],
  );

  const handlePlaceSelected = useCallback(
    async (place: GooglePlaceData) => {
      const selectedInput = activeInput;

      if (!selectedInput) {
        return;
      }

      if (selectedInput === 'pickup') {
        setPickupQuery(place.description);
      } else {
        setDestinationQuery(place.description);
      }

      setActiveInput(null);
      clearResults();

      const details = place.place_id
        ? await getPlaceDetailsById(place.place_id)
        : null;

      const didApplyLocation = mapPlaceSelectionToLocation(
        selectedInput,
        place,
        details,
      );

      if (didApplyLocation) {
        Keyboard.dismiss();

        const nextPickup = selectedInput === 'pickup' ? place : null;
        const nextDestination = selectedInput === 'destination' ? place : null;
        const shouldCloseAfterSelection = Boolean(
          (nextPickup || pickup) &&
          (nextDestination || destination) &&
          rideDateTime.dateTime,
        );

        if (shouldCloseAfterSelection) {
          closeLocationSheet();
        }
      }
    },
    [
      activeInput,
      clearResults,
      closeLocationSheet,
      destination,
      getPlaceDetailsById,
      mapPlaceSelectionToLocation,
      pickup,
      rideDateTime.dateTime,
    ],
  );

  const closeMapPicker = useCallback(() => {
    if (mapPreviewTimeoutRef.current) {
      clearTimeout(mapPreviewTimeoutRef.current);
      mapPreviewTimeoutRef.current = null;
    }

    setMapPickerInput(null);
    setMapPreviewLocation(null);
    setMapError(null);
    setIsWaitingForMapPreview(false);
    setIsLoadingMapPreview(false);
    setIsConfirmingMapLocation(false);
  }, []);

  const resolveMapPreviewLocation = useCallback(
    async (coordinate: MapCoordinate) => {
      const requestId = mapPreviewRequestRef.current + 1;
      mapPreviewRequestRef.current = requestId;
      setMapError(null);
      setIsLoadingMapPreview(true);

      try {
        const location =
          await currentLocationService.getLocationFromCoordinates(coordinate);

        if (mapPreviewRequestRef.current !== requestId) {
          return;
        }

        setMapPreviewLocation(location);
      } catch (caughtError) {
        if (mapPreviewRequestRef.current !== requestId) {
          return;
        }

        setMapPreviewLocation(null);
        setMapError(
          getErrorMessage(caughtError, FEEDBACK_MESSAGES.locationUnavailable),
        );
      } finally {
        if (mapPreviewRequestRef.current === requestId) {
          setIsLoadingMapPreview(false);
        }
      }
    },
    [],
  );

  const queueMapPreviewLocationResolve = useCallback(
    (coordinate: MapCoordinate) => {
      if (mapPreviewTimeoutRef.current) {
        clearTimeout(mapPreviewTimeoutRef.current);
      }

      lastQueuedMapPreviewCoordinateRef.current = coordinate;

      setMapError(null);
      setMapPreviewLocation(null);
      setIsWaitingForMapPreview(true);
      setIsLoadingMapPreview(false);

      mapPreviewTimeoutRef.current = setTimeout(() => {
        mapPreviewTimeoutRef.current = null;
        setIsWaitingForMapPreview(false);
        resolveMapPreviewLocation(coordinate);
      }, MAP_PREVIEW_DELAY_MS);
    },
    [resolveMapPreviewLocation],
  );

  const openMapPicker = useCallback(
    (input: ActiveLocationInput) => {
      const existingLocation =
        input === 'pickup' ? currentLocation : destination;
      const initialCoordinate = existingLocation ??
        currentLocation ?? {
          latitude: DEFAULT_MAP_REGION.latitude,
          longitude: DEFAULT_MAP_REGION.longitude,
        };

      Keyboard.dismiss();
      setActiveInput(null);
      clearResults();
      setMapError(null);
      setMapCoordinate(initialCoordinate);
      setMapRegion(currentRegion => ({
        ...currentRegion,
        latitude: initialCoordinate.latitude,
        longitude: initialCoordinate.longitude,
      }));
      setMapCameraRequestKey(currentKey => currentKey + 1);
      setMapPickerInput(input);
      lastQueuedMapPreviewCoordinateRef.current = null;
      queueMapPreviewLocationResolve(initialCoordinate);
    },
    [
      clearResults,
      currentLocation,
      destination,
      queueMapPreviewLocationResolve,
    ],
  );

  const useDeviceLocationOnMap = useCallback(async () => {
    if (mapPreviewTimeoutRef.current) {
      clearTimeout(mapPreviewTimeoutRef.current);
      mapPreviewTimeoutRef.current = null;
    }

    setMapError(null);
    setIsWaitingForMapPreview(false);
    setIsLoadingMapPreview(true);

    try {
      const location = await fetchCurrentLocation();

      if (location) {
        setMapCoordinate(location);
        setMapRegion(currentRegion => ({
          ...currentRegion,
          latitude: location.latitude,
          longitude: location.longitude,
        }));
        setMapCameraRequestKey(currentKey => currentKey + 1);
        setMapPreviewLocation(location);
        lastQueuedMapPreviewCoordinateRef.current = location;
      }
    } catch (caughtError) {
      setMapPreviewLocation(null);
      setMapError(
        getErrorMessage(caughtError, FEEDBACK_MESSAGES.locationUnavailable),
      );
    } finally {
      setIsLoadingMapPreview(false);
    }
  }, [fetchCurrentLocation]);

  const handleMapRegionChange = useCallback(
    (region: MapRegion) => {
      const coordinate = {
        latitude: region.latitude,
        longitude: region.longitude,
      };
      const lastQueuedCoordinate = lastQueuedMapPreviewCoordinateRef.current;
      const hasMovedEnoughForPreview =
        !lastQueuedCoordinate ||
        getDistanceInMeters(lastQueuedCoordinate, coordinate) >=
          MAP_PREVIEW_MIN_DISTANCE_METERS;

      setMapRegion(region);
      setMapCoordinate(coordinate);

      if (hasMovedEnoughForPreview) {
        queueMapPreviewLocationResolve(coordinate);
      }
    },
    [queueMapPreviewLocationResolve],
  );

  const confirmMapLocation = useCallback(async () => {
    if (!mapPickerInput || !mapPreviewLocation) {
      return;
    }

    setMapError(null);
    setIsConfirmingMapLocation(true);

    try {
      applyLocation(mapPickerInput, mapPreviewLocation);
      setActiveInput(null);

      const shouldCloseAfterMapSelection = Boolean(
        (mapPickerInput === 'pickup' ? mapPreviewLocation : pickup) &&
        (mapPickerInput === 'destination' ? mapPreviewLocation : destination) &&
        rideDateTime.dateTime,
      );

      closeMapPicker();

      if (shouldCloseAfterMapSelection) {
        closeLocationSheet();
      }
    } catch (caughtError) {
      const appError = createAppError(
        'LOCATION_GEOCODE_FAILED',
        getErrorMessage(caughtError, FEEDBACK_MESSAGES.locationUnavailable),
        caughtError,
      );

      setMapError(appError.message);
    } finally {
      setIsConfirmingMapLocation(false);
    }
  }, [
    applyLocation,
    closeLocationSheet,
    closeMapPicker,
    destination,
    mapPickerInput,
    mapPreviewLocation,
    pickup,
    rideDateTime.dateTime,
  ]);

  const handleDateTimeConfirm = useCallback(
    (selectedDateTime: Date) => {
      rideDateTime.handleDateTimeConfirm(selectedDateTime);

      if (pickup && destination && isFutureDateTime(selectedDateTime)) {
        closeLocationSheet();
      }
    },
    [closeLocationSheet, destination, pickup, rideDateTime],
  );

  return {
    bottomSheetRef,
    snapPoints,
    activeInput,
    pickupQuery,
    destinationQuery,
    searchResults,
    isSearchingPlaces,
    placesError,
    currentLocation,
    canCloseLocationSheet,
    destination,
    locationError: locationSearchError,
    hasGooglePlacesApiKey,
    isLoadingCurrentLocation: isLoading,
    shouldShowResults,
    mapPickerInput,
    mapRegion,
    mapCameraRequestKey,
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
    closeLocationSheet,
    openMapPicker,
    closeMapPicker,
    handleDateTimeConfirm,
    onMapRegionChange: handleMapRegionChange,
    useDeviceLocationOnMap,
    confirmMapLocation,
    handlePlaceSelected,
  };
};

const getDistanceInMeters = (
  from: MapCoordinate,
  to: MapCoordinate,
): number => {
  const earthRadiusMeters = 6371000;
  const degreesToRadians = Math.PI / 180;
  const fromLatitude = from.latitude * degreesToRadians;
  const toLatitude = to.latitude * degreesToRadians;
  const latitudeDelta = (to.latitude - from.latitude) * degreesToRadians;
  const longitudeDelta = (to.longitude - from.longitude) * degreesToRadians;
  const haversine =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  return (
    earthRadiusMeters *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
};

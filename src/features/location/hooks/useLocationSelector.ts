import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import { useLocationStore } from '@/store/location.store';
import {
  selectPlacesError,
  selectPlacesLoading,
  selectSearchResults,
  usePlacesStore,
} from '@/store/places.store';
import { currentLocationService } from '@/services/currentLocationService';
import { getErrorMessage } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import type {
  AppLocation,
  GooglePlaceData,
  GooglePlaceDetails,
  SavedLocation,
} from '@/types/types';
import type { ActiveLocationInput, MapCoordinate, MapRegion } from '../types';
import {
  DEFAULT_MAP_REGION,
  LOCATION_SEARCH_DEBOUNCE_MS,
  LOCATION_SEARCH_MIN_QUERY_LENGTH,
  MAP_PREVIEW_DELAY_MS,
  MAP_PREVIEW_MIN_DISTANCE_METERS,
} from '../constants/location.constants';
import {
  createRegionForCoordinate,
  getCoordinateFromRegion,
  getDefaultRegionForCoordinate,
  mapGooglePlaceToLocation,
} from '../helpers/location.helpers';
import { getDistanceInMeters } from '@/utils/geo';
import { useLocationSearch } from './useLocationSearch';
import { useSavedLocations } from './useSavedLocations';

type UseLocationSelectorOptions = {
  useCurrentLocationAsPickup?: boolean;
  deferMapSelectionUntilConfirm?: boolean;
};

export const useLocationSelector = ({
  useCurrentLocationAsPickup = true,
  deferMapSelectionUntilConfirm = false,
}: UseLocationSelectorOptions = {}) => {
  const mapPreviewRequestRef = useRef(0);
  const lastQueuedMapPreviewCoordinateRef = useRef<MapCoordinate | null>(null);
  const mapPreviewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [activeInput, setActiveInput] = useState<ActiveLocationInput | null>(
    null,
  );
  const [pickupQuery, setPickupQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [mapPickerInput, setMapPickerInput] =
    useState<ActiveLocationInput | null>(null);
  const [mapRegion, setMapRegion] = useState<MapRegion>(DEFAULT_MAP_REGION);
  const [mapCameraRequestKey, setMapCameraRequestKey] = useState(0);
  const [mapPreviewLocation, setMapPreviewLocation] =
    useState<AppLocation | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isWaitingForMapPreview, setIsWaitingForMapPreview] = useState(false);
  const [isLoadingMapPreview, setIsLoadingMapPreview] = useState(false);
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
  const { savedLocations, isLoadingSavedLocations, loadSavedLocations } =
    useSavedLocations();
  const {
    pickup,
    destination,
    setDestination,
    setPickup,
    clearDestination,
    clearPickup,
  } = useRideDraft();
  useEffect(() => {
    if (useCurrentLocationAsPickup && !pickup && currentLocation) {
      setPickup(currentLocation);
    }
  }, [currentLocation, pickup, setPickup, useCurrentLocationAsPickup]);

  useEffect(() => {
    loadSavedLocations();
  }, [loadSavedLocations]);

  useEffect(() => {
    if (activeInput !== 'pickup') {
      const pendingPickupAddress =
        deferMapSelectionUntilConfirm &&
        mapPickerInput === 'pickup' &&
        mapPreviewLocation
          ? mapPreviewLocation.address
          : '';
      const currentPickupAddress = useCurrentLocationAsPickup
        ? (currentLocation?.address ?? '')
        : '';

      setPickupQuery(
        pickup?.address || pendingPickupAddress || currentPickupAddress,
      );
    }
  }, [
    activeInput,
    currentLocation?.address,
    deferMapSelectionUntilConfirm,
    mapPickerInput,
    mapPreviewLocation,
    pickup?.address,
    useCurrentLocationAsPickup,
  ]);

  useEffect(() => {
    if (activeInput !== 'destination') {
      const pendingDestinationAddress =
        deferMapSelectionUntilConfirm &&
        mapPickerInput === 'destination' &&
        mapPreviewLocation
          ? mapPreviewLocation.address
          : '';

      setDestinationQuery(destination?.address ?? pendingDestinationAddress);
    }
  }, [
    activeInput,
    deferMapSelectionUntilConfirm,
    destination?.address,
    mapPickerInput,
    mapPreviewLocation,
  ]);

  const activeQuery =
    activeInput === 'pickup'
      ? pickupQuery
      : activeInput === 'destination'
        ? destinationQuery
        : '';
  const shouldShowResults =
    activeInput !== null &&
    activeQuery.trim().length >= LOCATION_SEARCH_MIN_QUERY_LENGTH;
  const selectedActiveAddress =
    activeInput === 'pickup'
      ? (pickup?.address ??
        (useCurrentLocationAsPickup ? currentLocation?.address : null))
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

  const focusMapInput = useCallback(
    (input: ActiveLocationInput) => {
      const existingLocation = input === 'pickup' ? pickup : destination;

      setActiveInput(input);
      setMapPickerInput(input);
      clearResults();

      if (!existingLocation) {
        setMapPreviewLocation(null);
        return;
      }

      setMapPreviewLocation(existingLocation);
      setMapRegion(createRegionForCoordinate(existingLocation));
      setMapCameraRequestKey(currentKey => currentKey + 1);
      lastQueuedMapPreviewCoordinateRef.current = existingLocation;
    },
    [clearResults, destination, pickup],
  );

  const clearLocationInput = useCallback(
    (input: ActiveLocationInput) => {
      if (input === 'pickup') {
        setPickupQuery('');
        clearPickup();
      } else {
        setDestinationQuery('');
        clearDestination();
      }

      setActiveInput(input);
      setMapPickerInput(input);
      setMapPreviewLocation(null);
      setMapError(null);
      clearResults();
      lastQueuedMapPreviewCoordinateRef.current = null;
    },
    [clearDestination, clearPickup, clearResults],
  );

  const mapPlaceSelectionToLocation = useCallback(
    (
      input: ActiveLocationInput,
      data: GooglePlaceData,
      details: GooglePlaceDetails | null,
    ) => {
      const location = mapGooglePlaceToLocation(data, details);

      if (!location) {
        return null;
      }

      if (!deferMapSelectionUntilConfirm) {
        applyLocation(input, location);
      }

      return location;
    },
    [applyLocation, deferMapSelectionUntilConfirm],
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

      clearResults();

      const details = place.place_id
        ? await getPlaceDetailsById(place.place_id)
        : null;

      const selectedLocation = mapPlaceSelectionToLocation(
        selectedInput,
        place,
        details,
      );

      if (selectedLocation) {
        if (selectedInput === 'pickup') {
          setPickupQuery(selectedLocation.address);
        } else {
          setDestinationQuery(selectedLocation.address);
        }

        Keyboard.dismiss();
        setActiveInput(null);
        setMapPickerInput(selectedInput);
        setMapPreviewLocation(selectedLocation);
        setMapRegion(createRegionForCoordinate(selectedLocation));
        setMapCameraRequestKey(currentKey => currentKey + 1);
        lastQueuedMapPreviewCoordinateRef.current = selectedLocation;
      }
    },
    [
      activeInput,
      clearResults,
      getPlaceDetailsById,
      mapPlaceSelectionToLocation,
    ],
  );

  const handleSavedLocationSelected = useCallback(
    (savedLocation: SavedLocation) => {
      const input = activeInput ?? 'destination';

      if (input === 'pickup') {
        setPickupQuery(savedLocation.location.address);
      } else {
        setDestinationQuery(savedLocation.location.address);
      }

      if (!deferMapSelectionUntilConfirm) {
        applyLocation(input, savedLocation.location);
      }

      setMapPickerInput(input);
      clearResults();
      Keyboard.dismiss();
      setActiveInput(null);
      setMapPreviewLocation(savedLocation.location);
      setMapRegion(createRegionForCoordinate(savedLocation.location));
      setMapCameraRequestKey(currentKey => currentKey + 1);
      lastQueuedMapPreviewCoordinateRef.current = savedLocation.location;
    },
    [activeInput, applyLocation, clearResults, deferMapSelectionUntilConfirm],
  );

  const closeMapPicker = useCallback(() => {
    if (mapPreviewTimeoutRef.current) {
      clearTimeout(mapPreviewTimeoutRef.current);
      mapPreviewTimeoutRef.current = null;
    }

    setMapPickerInput(null);
    setActiveInput(null);
    setMapPreviewLocation(null);
    setMapError(null);
    setIsWaitingForMapPreview(false);
    setIsLoadingMapPreview(false);
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
      const existingLocation = input === 'pickup' ? pickup : destination;
      const initialCoordinate: MapCoordinate | AppLocation | null =
        existingLocation ?? currentLocation;
      const initialRegion = getDefaultRegionForCoordinate(initialCoordinate);
      const nextCoordinate = initialCoordinate ?? {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      };

      Keyboard.dismiss();
      setActiveInput(input);
      clearResults();
      setMapError(null);
      setMapRegion(createRegionForCoordinate(nextCoordinate, initialRegion));
      setMapCameraRequestKey(currentKey => currentKey + 1);
      setMapPickerInput(input);
      lastQueuedMapPreviewCoordinateRef.current = null;
      queueMapPreviewLocationResolve(nextCoordinate);
    },
    [
      clearResults,
      currentLocation,
      destination,
      pickup,
      queueMapPreviewLocationResolve,
    ],
  );

  const openRouteMapPicker = useCallback(() => {
    loadSavedLocations();
    openMapPicker(pickup ? 'destination' : 'pickup');
  }, [loadSavedLocations, openMapPicker, pickup]);

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
        setMapRegion(createRegionForCoordinate(location));
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
      const coordinate = getCoordinateFromRegion(region);
      const lastQueuedCoordinate = lastQueuedMapPreviewCoordinateRef.current;
      const hasMovedEnoughForPreview =
        !lastQueuedCoordinate ||
        getDistanceInMeters(lastQueuedCoordinate, coordinate) >=
          MAP_PREVIEW_MIN_DISTANCE_METERS;

      setMapRegion(region);

      if (hasMovedEnoughForPreview) {
        queueMapPreviewLocationResolve(coordinate);
      }
    },
    [queueMapPreviewLocationResolve],
  );

  const confirmRouteMapLocation = useCallback(() => {
    if (!mapPickerInput || !mapPreviewLocation) {
      return;
    }

    const confirmedInput = mapPickerInput;
    const nextPickup =
      confirmedInput === 'pickup' ? mapPreviewLocation : pickup;
    const nextDestination =
      confirmedInput === 'destination' ? mapPreviewLocation : destination;
    const nextInput = !nextPickup
      ? 'pickup'
      : !nextDestination
        ? 'destination'
        : null;

    setMapError(null);
    applyLocation(confirmedInput, mapPreviewLocation);

    setMapPreviewLocation(null);

    if (nextInput) {
      setActiveInput(nextInput);
      setMapPickerInput(nextInput);
      lastQueuedMapPreviewCoordinateRef.current = null;
    } else {
      setActiveInput(null);
    }
  }, [applyLocation, destination, mapPickerInput, mapPreviewLocation, pickup]);

  return {
    activeInput,
    pickupQuery,
    destinationQuery,
    searchResults,
    isSearchingPlaces,
    placesError,
    currentLocation,
    destination,
    pickup,
    savedLocations,
    isLoadingSavedLocations,
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
    setPickupQuery,
    setDestinationQuery,
    clearLocationInput,
    setActiveInput: focusMapInput,
    openRouteMapPicker,
    openMapPicker,
    closeMapPicker,
    onMapRegionChange: handleMapRegionChange,
    useDeviceLocationOnMap,
    confirmRouteMapLocation,
    handlePlaceSelected,
    onSavedLocationSelected: handleSavedLocationSelected,
  };
};

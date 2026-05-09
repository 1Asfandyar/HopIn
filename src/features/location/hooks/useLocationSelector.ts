import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
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
import { savedLocationsService } from '@/services/savedLocationsService';
import { createAppError, getErrorMessage } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import type {
  AppLocation,
  GooglePlaceData,
  GooglePlaceDetails,
  SavedLocation,
  SavedLocationKind,
} from '@/types/types';
import type { ActiveLocationInput, MapCoordinate, MapRegion } from '../types';
import {
  DEFAULT_CURRENT_LOCATION_MAP_REGION,
  DEFAULT_MAP_REGION,
  LOCATION_SEARCH_DEBOUNCE_MS,
  LOCATION_SEARCH_MIN_QUERY_LENGTH,
  MAP_PREVIEW_DELAY_MS,
  MAP_PREVIEW_MIN_DISTANCE_METERS,
} from '../constants/location.constants';
import { mapGooglePlaceToLocation } from '../helpers/location.helpers';
import { useLocationSearch } from './useLocationSearch';

export const useLocationSelector = () => {
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
  const [, setMapCoordinate] = useState<MapCoordinate>({
    latitude: DEFAULT_MAP_REGION.latitude,
    longitude: DEFAULT_MAP_REGION.longitude,
  });
  const [mapRegion, setMapRegion] = useState<MapRegion>(DEFAULT_MAP_REGION);
  const [mapCameraRequestKey, setMapCameraRequestKey] = useState(0);
  const [mapPreviewLocation, setMapPreviewLocation] =
    useState<AppLocation | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isOpeningMapPicker, setIsOpeningMapPicker] = useState(false);
  const [isWaitingForMapPreview, setIsWaitingForMapPreview] = useState(false);
  const [isLoadingMapPreview, setIsLoadingMapPreview] = useState(false);
  const [isConfirmingMapLocation, setIsConfirmingMapLocation] = useState(false);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isLoadingSavedLocations, setIsLoadingSavedLocations] = useState(false);
  const [isSavingLocation, setIsSavingLocation] = useState(false);
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

  useEffect(() => {
    if (!pickup && currentLocation) {
      setPickup(currentLocation);
    }
  }, [currentLocation, pickup, setPickup]);

  useEffect(() => {
    loadSavedLocations();
  }, [loadSavedLocations]);

  useEffect(() => {
    if (activeInput !== 'pickup') {
      setPickupQuery(pickup?.address ?? currentLocation?.address ?? '');
    }
  }, [activeInput, currentLocation?.address, pickup?.address]);

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
  const shouldShowResults =
    activeInput !== null &&
    activeQuery.trim().length >= LOCATION_SEARCH_MIN_QUERY_LENGTH;
  const selectedActiveAddress =
    activeInput === 'pickup'
      ? (pickup?.address ?? currentLocation?.address)
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

  const handleActiveInputChange = useCallback((input: ActiveLocationInput) => {
    setActiveInput(input);
    setMapPickerInput(input);
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
        return null;
      }

      applyLocation(input, location);
      return location;
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
        Keyboard.dismiss();
        setMapPickerInput(selectedInput);
        setMapPreviewLocation(selectedLocation);
        setMapRegion({
          ...DEFAULT_CURRENT_LOCATION_MAP_REGION,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        });
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

      applyLocation(input, savedLocation.location);
      setMapPickerInput(input);
      clearResults();
      Keyboard.dismiss();
      setMapPreviewLocation(savedLocation.location);
      setMapRegion({
        ...DEFAULT_CURRENT_LOCATION_MAP_REGION,
        latitude: savedLocation.location.latitude,
        longitude: savedLocation.location.longitude,
      });
      setMapCameraRequestKey(currentKey => currentKey + 1);
      lastQueuedMapPreviewCoordinateRef.current = savedLocation.location;
    },
    [activeInput, applyLocation, clearResults],
  );

  const saveLocation = useCallback(
    async (
      input: ActiveLocationInput,
      label: string,
      kind: SavedLocationKind,
    ) => {
      const location = input === 'pickup' ? pickup : destination;

      if (!location) {
        throw new Error('Choose a location before saving it.');
      }

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
    [destination, pickup],
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
    async (input: ActiveLocationInput) => {
      const existingLocation = input === 'pickup' ? pickup : destination;
      let initialCoordinate: MapCoordinate | AppLocation | null =
        existingLocation ?? currentLocation;

      let nextMapError: string | null = null;

      if (!initialCoordinate && input === 'pickup') {
        setIsOpeningMapPicker(true);

        try {
          initialCoordinate = await fetchCurrentLocation();
        } catch (caughtError) {
          nextMapError = getErrorMessage(
            caughtError,
            FEEDBACK_MESSAGES.locationUnavailable,
          );
        } finally {
          setIsOpeningMapPicker(false);
        }
      }

      const initialRegion = initialCoordinate
        ? DEFAULT_CURRENT_LOCATION_MAP_REGION
        : DEFAULT_MAP_REGION;
      const nextCoordinate = initialCoordinate ?? {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      };

      Keyboard.dismiss();
      setActiveInput(input);
      clearResults();
      setMapError(nextMapError);
      setMapCoordinate(nextCoordinate);
      setMapRegion({
        ...initialRegion,
        latitude: nextCoordinate.latitude,
        longitude: nextCoordinate.longitude,
      });
      setMapCameraRequestKey(currentKey => currentKey + 1);
      setMapPickerInput(input);
      lastQueuedMapPreviewCoordinateRef.current = null;
      queueMapPreviewLocationResolve(nextCoordinate);
    },
    [
      clearResults,
      currentLocation,
      destination,
      fetchCurrentLocation,
      pickup,
      queueMapPreviewLocationResolve,
    ],
  );

  const openRouteMapPicker = useCallback(() => {
    loadSavedLocations();
    openMapPicker(destination ? 'destination' : 'pickup');
  }, [destination, loadSavedLocations, openMapPicker]);

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
        setMapRegion({
          ...DEFAULT_CURRENT_LOCATION_MAP_REGION,
          latitude: location.latitude,
          longitude: location.longitude,
        });
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
      closeMapPicker();
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
  }, [applyLocation, closeMapPicker, mapPickerInput, mapPreviewLocation]);

  const handleDateTimeConfirm = useCallback(
    (selectedDateTime: Date) => {
      rideDateTime.handleDateTimeConfirm(selectedDateTime);
    },
    [rideDateTime],
  );

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
    isSavingLocation,
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
    isOpeningMapPicker,
    rideDateTime,
    setPickupQuery,
    setDestinationQuery,
    setActiveInput: handleActiveInputChange,
    openRouteMapPicker,
    openMapPicker,
    closeMapPicker,
    handleDateTimeConfirm,
    onMapRegionChange: handleMapRegionChange,
    useDeviceLocationOnMap,
    confirmMapLocation,
    handlePlaceSelected,
    onSavedLocationSelected: handleSavedLocationSelected,
    saveLocation,
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

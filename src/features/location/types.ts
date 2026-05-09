import type {
  AppError,
  AppLocation,
  GooglePlaceData,
  LocationInputProps,
  SavedLocation,
  SavedLocationKind,
  RideFlowMode,
} from '@/types/types';

export type { LocationInputProps };

export type ActiveLocationInput = 'pickup' | 'destination';

export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

export type MapRegion = MapCoordinate & {
  latitudeDelta: number;
  longitudeDelta: number;
};

export type PlaceResultsListProps = {
  results: GooglePlaceData[];
  isLoading: boolean;
  error: AppError | null;
  onPlacePress: (place: GooglePlaceData) => void;
};

export type MapLocationPickerProps = {
  visible: boolean;
  flowMode: RideFlowMode;
  inputType: ActiveLocationInput | null;
  activeInput: ActiveLocationInput | null;
  pickupQuery: string;
  destinationQuery: string;
  pickup: AppLocation | null;
  destination: AppLocation | null;
  searchResults: GooglePlaceData[];
  isSearchingPlaces: boolean;
  placesError: AppError | null;
  shouldShowResults: boolean;
  savedLocations: SavedLocation[];
  isLoadingSavedLocations: boolean;
  locationError: AppError | null;
  hasGooglePlacesApiKey: boolean;
  isLoadingCurrentLocation: boolean;
  region: MapRegion;
  cameraRequestKey: number;
  previewLocation: AppLocation | null;
  isWaitingForPreview: boolean;
  isLoadingPreview: boolean;
  isConfirming: boolean;
  error: string | null;
  onPickupChange: (text: string) => void;
  onDestinationChange: (text: string) => void;
  onActiveInputChange: (input: ActiveLocationInput) => void;
  onPlaceSelected: (place: GooglePlaceData) => void;
  onSavedLocationSelected: (savedLocation: SavedLocation) => void;
  onRegionChange: (region: MapRegion) => void;
  onUseCurrentLocation: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export type LocationSelectorViewProps = {
  flowMode: 'offer' | 'find';
  roleLabel: string;
  heading: string;
  description: string;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: () => void;
  isSubmitting: boolean;
  activeInput: ActiveLocationInput | null;
  pickupQuery: string;
  destinationQuery: string;
  searchResults: GooglePlaceData[];
  isSearchingPlaces: boolean;
  placesError: AppError | null;
  pickup: AppLocation | null;
  destination: AppLocation | null;
  savedLocations: SavedLocation[];
  isLoadingSavedLocations: boolean;
  isSavingLocation: boolean;
  locationError: AppError | null;
  hasGooglePlacesApiKey: boolean;
  isLoadingCurrentLocation: boolean;
  shouldShowResults: boolean;
  mapPickerInput: ActiveLocationInput | null;
  mapRegion: MapRegion;
  mapCameraRequestKey: number;
  mapPreviewLocation: AppLocation | null;
  mapError: string | null;
  isWaitingForMapPreview: boolean;
  isLoadingMapPreview: boolean;
  isConfirmingMapLocation: boolean;
  dateTime: Date | null;
  isDateTimePickerOpen: boolean;
  minDateTime: Date;
  formatDateAndTime: (date: Date | null) => string;
  onPickupChange: (text: string) => void;
  onDestinationChange: (text: string) => void;
  onActiveInputChange: (input: ActiveLocationInput) => void;
  onOpenRouteMap: () => void;
  onOpenLocationMap: (input: ActiveLocationInput) => void;
  onOpenDateTimePicker: () => void;
  onCloseDateTimePicker: () => void;
  onDateTimeConfirm: (selectedDateTime: Date) => void;
  onCloseMapPicker: () => void;
  onMapRegionChange: (region: MapRegion) => void;
  onUseDeviceLocationOnMap: () => void;
  onConfirmMapLocation: () => void;
  onPlaceSelected: (place: GooglePlaceData) => void;
  onSavedLocationSelected: (savedLocation: SavedLocation) => void;
  onSaveLocation: (
    input: ActiveLocationInput,
    label: string,
    kind: SavedLocationKind,
  ) => Promise<void>;
};

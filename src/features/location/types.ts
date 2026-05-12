import type {
  AppError,
  AppLocation,
  GooglePlaceData,
  SavedLocation,
  RideFlowMode,
} from '@/types/types';

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
  error: string | null;
  onPickupChange: (text: string) => void;
  onDestinationChange: (text: string) => void;
  onLocationInputClear: (input: ActiveLocationInput) => void;
  onActiveInputChange: (input: ActiveLocationInput) => void;
  onPlaceSelected: (place: GooglePlaceData) => void;
  onSavedLocationSelected: (savedLocation: SavedLocation) => void;
  onRegionChange: (region: MapRegion) => void;
  onUseCurrentLocation: () => void;
  onConfirm: () => void;
  onClose: () => void;
  routeActionLabel?: string;
  routeActionDisabled?: boolean;
  routeActionLoading?: boolean;
  routeSeatCount?: number | null;
  routeSeatControlEditable?: boolean;
  routeSeatControlLabel?: string;
  routeSeatControlHelperText?: string;
  onRouteSeatCountChange?: (seats: number) => void;
  onRouteAction?: () => void;
};

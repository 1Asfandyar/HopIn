import type { RefObject } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type {
  AppError,
  AppLocation,
  GooglePlaceData,
  LocationInputProps,
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
  inputType: ActiveLocationInput | null;
  region: MapRegion;
  cameraRequestKey: number;
  previewLocation: AppLocation | null;
  isWaitingForPreview: boolean;
  isLoadingPreview: boolean;
  isConfirming: boolean;
  error: string | null;
  onRegionChange: (region: MapRegion) => void;
  onUseCurrentLocation: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export type LocationSelectorViewProps = {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  snapPoints: string[];
  topInset: number;
  activeInput: ActiveLocationInput | null;
  pickupQuery: string;
  destinationQuery: string;
  searchResults: GooglePlaceData[];
  isSearchingPlaces: boolean;
  placesError: AppError | null;
  pickup: AppLocation | null;
  destination: AppLocation | null;
  locationError: AppError | null;
  hasGooglePlacesApiKey: boolean;
  isLoadingCurrentLocation: boolean;
  canCloseLocationSheet: boolean;
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
  onOpenLocationSheet: () => void;
  onOpenDateTimePicker: () => void;
  onCloseDateTimePicker: () => void;
  onDateTimeConfirm: (selectedDateTime: Date) => void;
  onOpenMapPicker: (input: ActiveLocationInput) => void;
  onCloseMapPicker: () => void;
  onMapRegionChange: (region: MapRegion) => void;
  onUseDeviceLocationOnMap: () => void;
  onConfirmMapLocation: () => void;
  onPlaceSelected: (place: GooglePlaceData) => void;
};

import { memo, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, type Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { fontFamilies, themeColors } from '@/theme/tokens';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import type { ActiveLocationInput, MapLocationPickerProps } from '../types';
import {
  LOCATION_SELECTOR_COPY,
  MAP_LOCATION_PICKER_COPY,
} from '../constants/location.constants';
import PlaceResultsList from './PlaceResultsList';

const mapProvider = Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined;

const inputCopy: Record<
  ActiveLocationInput,
  {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    placeholder: string;
  }
> = {
  pickup: {
    icon: 'locate',
    label: LOCATION_SELECTOR_COPY.fromLabel,
    placeholder: LOCATION_SELECTOR_COPY.pickupPlaceholder,
  },
  destination: {
    icon: 'location',
    label: LOCATION_SELECTOR_COPY.toLabel,
    placeholder: LOCATION_SELECTOR_COPY.destinationPlaceholder,
  },
};

const MapLocationPicker = ({
  visible,
  flowMode,
  inputType,
  activeInput,
  pickupQuery,
  destinationQuery,
  pickup,
  destination,
  searchResults,
  isSearchingPlaces,
  placesError,
  shouldShowResults,
  savedLocations,
  isLoadingSavedLocations,
  locationError,
  hasGooglePlacesApiKey,
  isLoadingCurrentLocation,
  region,
  cameraRequestKey,
  previewLocation,
  isWaitingForPreview,
  isLoadingPreview,
  isConfirming,
  error,
  onPickupChange,
  onDestinationChange,
  onActiveInputChange,
  onPlaceSelected,
  onSavedLocationSelected,
  onRegionChange,
  onUseCurrentLocation,
  onConfirm,
  onClose,
}: MapLocationPickerProps) => {
  const mapRef = useRef<MapView | null>(null);
  const latestRegionRef = useRef(region);
  const modeColor =
    flowMode === 'find' ? themeColors.secondary : themeColors.primary;
  const modeTextStyle = { color: modeColor };
  const selectionInput = inputType ?? activeInput ?? 'destination';
  const detailHeading =
    selectionInput === 'pickup'
      ? MAP_LOCATION_PICKER_COPY.pickupHeading
      : MAP_LOCATION_PICKER_COPY.destinationHeading;
  const selectedRouteLocation =
    selectionInput === 'pickup' ? pickup : destination;
  const detailDescription =
    previewLocation?.address ??
    selectedRouteLocation?.address ??
    MAP_LOCATION_PICKER_COPY.idleDescription;

  useEffect(() => {
    latestRegionRef.current = region;
  }, [region]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    mapRef.current?.animateToRegion(latestRegionRef.current as Region, 250);
  }, [cameraRequestKey, visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={16} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={themeColors.gray700} />
          </Pressable>
          <ThemedText weight="semiBold" className="text-base text-gray-900">
            {MAP_LOCATION_PICKER_COPY.routeTitle}
          </ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchPanel}>
          <RouteInput
            input="pickup"
            value={pickupQuery}
            isActive={activeInput === 'pickup'}
            isSearching={activeInput === 'pickup' && isSearchingPlaces}
            modeColor={modeColor}
            onChangeText={onPickupChange}
            onFocus={onActiveInputChange}
          />
          <RouteInput
            input="destination"
            value={destinationQuery}
            isActive={activeInput === 'destination'}
            isSearching={activeInput === 'destination' && isSearchingPlaces}
            modeColor={modeColor}
            onChangeText={onDestinationChange}
            onFocus={onActiveInputChange}
          />

          {savedLocations.length > 0 && (
            <View style={styles.savedLocationsRow}>
              {savedLocations.slice(0, 4).map(savedLocation => (
                <TouchableOpacity
                  key={savedLocation.id}
                  activeOpacity={0.75}
                  onPress={() => onSavedLocationSelected(savedLocation)}
                  style={styles.savedLocationButton}
                >
                  <Ionicons name="bookmark" size={14} color={modeColor} />
                  <ThemedText
                    size="sm"
                    weight="semiBold"
                    className="ml-1"
                    style={modeTextStyle}
                    numberOfLines={1}
                  >
                    {savedLocation.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {isLoadingSavedLocations && (
            <ActivityIndicator size="small" color={themeColors.gray400} />
          )}
          {isLoadingCurrentLocation && (
            <ThemedText className="px-1 pb-2 text-sm text-gray-500">
              {FEEDBACK_MESSAGES.currentLocationLoading}
            </ThemedText>
          )}
          {locationError && (
            <ThemedText className="px-1 pb-2 text-sm text-red-500">
              {locationError.message}
            </ThemedText>
          )}
          {!hasGooglePlacesApiKey && (
            <ThemedText className="px-1 pb-2 text-sm text-red-500">
              {FEEDBACK_MESSAGES.missingGooglePlacesKey}
            </ThemedText>
          )}

          {shouldShowResults && (
            <PlaceResultsList
              results={searchResults}
              isLoading={isSearchingPlaces}
              error={placesError}
              onPlacePress={onPlaceSelected}
            />
          )}
        </View>

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={mapProvider}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={nextRegion => onRegionChange(nextRegion)}
            showsUserLocation
            showsMyLocationButton={false}
            showsCompass
            showsScale
            zoomControlEnabled
          />
          <View pointerEvents="none" style={styles.pointerWrapper}>
            <View style={styles.pointerShadow}>
              <Ionicons name="location-sharp" size={42} color={modeColor} />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onUseCurrentLocation}
            style={styles.currentLocationButton}
          >
            <Ionicons name="navigate-circle" size={24} color={modeColor} />
            <ThemedText
              weight="semiBold"
              className="text-sm ml-2"
              style={modeTextStyle}
            >
              {MAP_LOCATION_PICKER_COPY.currentLocationButtonLabel}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.detailPanel}>
          <ThemedText weight="semiBold" className="text-base text-gray-900">
            {detailHeading}
          </ThemedText>
          <View className="h-px bg-gray-200 my-3" />
          <ThemedText className="text-sm text-gray-600 mb-4">
            {detailDescription}
          </ThemedText>
          {error && (
            <ThemedText className="text-red-500 text-sm mb-3">
              {error}
            </ThemedText>
          )}
          <ThemedButton
            title={MAP_LOCATION_PICKER_COPY.confirmButtonLabel}
            loading={isConfirming}
            disabled={
              !previewLocation || isWaitingForPreview || isLoadingPreview
            }
            onPress={onConfirm}
            colorScheme={flowMode === 'find' ? 'secondary' : 'primary'}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

type RouteInputProps = {
  input: ActiveLocationInput;
  value: string;
  isActive: boolean;
  isSearching: boolean;
  modeColor: string;
  onChangeText: (text: string) => void;
  onFocus: (input: ActiveLocationInput) => void;
};

const RouteInput = ({
  input,
  value,
  isActive,
  isSearching,
  modeColor,
  onChangeText,
  onFocus,
}: RouteInputProps) => {
  const copy = inputCopy[input];
  const activeInputStyle = isActive ? { borderColor: modeColor } : null;

  return (
    <View style={[styles.routeInput, activeInputStyle]}>
      <Ionicons name={copy.icon} size={18} color={themeColors.gray400} />
      <View style={styles.routeInputTextWrap}>
        <ThemedText weight="semiBold" className="text-[11px] text-gray-500">
          {copy.label}
        </ThemedText>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => onFocus(input)}
          placeholder={copy.placeholder}
          placeholderTextColor={themeColors.gray400}
          style={styles.routeTextInput}
        />
      </View>
      {isSearching && (
        <ActivityIndicator size="small" color={themeColors.gray400} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: themeColors.white,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.gray200,
  },
  headerSpacer: {
    width: 24,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -10,
    marginLeft: -10,
  },
  searchPanel: {
    zIndex: 2,
    padding: 12,
    backgroundColor: themeColors.white,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.gray200,
  },
  routeInput: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.gray200,
    borderRadius: 14,
    backgroundColor: themeColors.white,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  routeInputTextWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: 10,
  },
  routeTextInput: {
    minWidth: 0,
    paddingVertical: 4,
    fontFamily: fontFamilies.regular,
    color: themeColors.gray900,
  },
  savedLocationsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  savedLocationButton: {
    maxWidth: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.gray200,
    borderRadius: 999,
    backgroundColor: themeColors.white,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  pointerWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -21,
    marginTop: -42,
  },
  pointerShadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
  },
  currentLocationButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: themeColors.gray200,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  detailPanel: {
    backgroundColor: themeColors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: themeColors.gray200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default memo(MapLocationPicker);

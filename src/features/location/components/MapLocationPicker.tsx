import { memo, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, type Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import RideSeatsControl from '@/features/rides/components/RideSeatsControl';
import type { ActiveLocationInput, MapLocationPickerProps } from '../types';
import {
  LOCATION_SELECTOR_COPY,
  MAP_LOCATION_PICKER_COPY,
} from '../constants/location.constants';
import PlaceResultsList from './PlaceResultsList';
import RouteLocationSearchInput from './RouteLocationSearchInput';
import SavedLocationShortcuts from './SavedLocationShortcuts';
import { mapLocationPickerStyles as styles } from './MapLocationPicker.styles';

const mapProvider = Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

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
  onLocationInputClear,
  routeActionLabel,
  routeActionDisabled = false,
  routeActionLoading = false,
  routeSeatCount,
  routeSeatControlEditable = false,
  routeSeatControlLabel,
  routeSeatControlHelperText,
  onRouteSeatCountChange,
  onRouteAction,
}: MapLocationPickerProps) => {
  const mapRef = useRef<MapView | null>(null);
  const latestRegionRef = useRef(region);
  const currentLocationPulse = useRef(new Animated.Value(1)).current;
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
  const isRouteFlow = Boolean(onRouteAction);
  const canSelectDestination = !isRouteFlow || Boolean(pickup);
  const shouldShowRouteSummary = Boolean(
    isRouteFlow && pickup && destination && !activeInput && !previewLocation,
  );
  const shouldShowMapControls = !shouldShowRouteSummary;
  const shouldShowSeatControl =
    routeSeatControlEditable || routeSeatCount !== undefined;
  const routeSummaryRows = [
    {
      label: LOCATION_SELECTOR_COPY.fromLabel,
      address: pickup?.address,
    },
    {
      label: LOCATION_SELECTOR_COPY.toLabel,
      address: destination?.address,
    },
  ];
  const handleInputFocus = (input: ActiveLocationInput) => {
    if (input === 'destination' && !canSelectDestination) {
      return;
    }

    onActiveInputChange(input);
  };

  useEffect(() => {
    latestRegionRef.current = region;
  }, [region]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    mapRef.current?.animateToRegion(latestRegionRef.current as Region, 250);
  }, [cameraRequestKey, visible]);

  useEffect(() => {
    if (!visible || !shouldShowMapControls) {
      currentLocationPulse.setValue(1);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(currentLocationPulse, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(currentLocationPulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [currentLocationPulse, shouldShowMapControls, visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
      navigationBarTranslucent
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
          <RouteLocationSearchInput
            input="pickup"
            value={pickupQuery}
            isActive={activeInput === 'pickup'}
            isSearching={activeInput === 'pickup' && isSearchingPlaces}
            modeColor={modeColor}
            onChangeText={onPickupChange}
            onClear={onLocationInputClear}
            onFocus={handleInputFocus}
          />
          <RouteLocationSearchInput
            input="destination"
            value={destinationQuery}
            isActive={activeInput === 'destination'}
            isSearching={activeInput === 'destination' && isSearchingPlaces}
            modeColor={modeColor}
            disabled={!canSelectDestination}
            onChangeText={onDestinationChange}
            onClear={onLocationInputClear}
            onFocus={handleInputFocus}
          />

          <SavedLocationShortcuts
            savedLocations={savedLocations}
            modeColor={modeColor}
            onSavedLocationSelected={onSavedLocationSelected}
          />

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
            onRegionChangeComplete={nextRegion => {
              if (!shouldShowRouteSummary) {
                onRegionChange(nextRegion);
              }
            }}
            showsUserLocation
            showsMyLocationButton={false}
            showsCompass
            showsScale
            zoomControlEnabled
          />
          {shouldShowMapControls && (
            <View pointerEvents="none" style={styles.pointerWrapper}>
              <View style={styles.pointerShadow}>
                <Ionicons name="location-sharp" size={42} color={modeColor} />
              </View>
            </View>
          )}
          {shouldShowMapControls && (
            <AnimatedTouchableOpacity
              activeOpacity={0.8}
              onPress={onUseCurrentLocation}
              style={[
                styles.currentLocationButton,
                { transform: [{ scale: currentLocationPulse }] },
              ]}
              accessibilityLabel={
                MAP_LOCATION_PICKER_COPY.currentLocationButtonLabel
              }
            >
              <Ionicons name="navigate-circle" size={24} color={modeColor} />
            </AnimatedTouchableOpacity>
          )}
        </View>

        <View
          style={[
            styles.detailPanel,
            shouldShowRouteSummary && styles.routeSummaryPanel,
          ]}
        >
          {shouldShowRouteSummary ? (
            <>
              <ScrollView
                style={styles.routeSummaryContent}
                contentContainerStyle={styles.routeSummaryContentContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.routeSummaryStatus}>
                  {routeActionLoading ? (
                    <ActivityIndicator size="small" color={modeColor} />
                  ) : (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={modeColor}
                    />
                  )}
                  <ThemedText
                    weight="semiBold"
                    className="ml-2 text-sm"
                    style={modeTextStyle}
                  >
                    {routeActionLoading ? 'Preparing route...' : 'Route ready'}
                  </ThemedText>
                </View>
                <View className="h-px bg-gray-200 my-3" />
                <View style={styles.routeSummaryRows}>
                  {routeSummaryRows.map(row => (
                    <View key={row.label} style={styles.routeSummaryRow}>
                      <ThemedText
                        weight="semiBold"
                        className="text-[11px] uppercase text-gray-500"
                      >
                        {row.label}
                      </ThemedText>
                      <ThemedText className="mt-1 text-sm text-gray-800">
                        {row.address}
                      </ThemedText>
                    </View>
                  ))}

                  {shouldShowSeatControl && (
                    <RideSeatsControl
                      value={routeSeatCount}
                      editable={routeSeatControlEditable}
                      label={routeSeatControlLabel}
                      helperText={routeSeatControlHelperText}
                      color={modeColor}
                      onChange={onRouteSeatCountChange}
                    />
                  )}
                </View>
              </ScrollView>

              <View style={styles.routeActionFooter}>
                <ThemedButton
                  title={routeActionLabel ?? 'Done'}
                  loading={routeActionLoading}
                  disabled={routeActionDisabled || routeActionLoading}
                  rightIcon="arrow-forward-circle"
                  onPress={onRouteAction}
                  colorScheme={flowMode === 'find' ? 'secondary' : 'primary'}
                />
              </View>
            </>
          ) : (
            <>
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
                disabled={
                  !previewLocation || isWaitingForPreview || isLoadingPreview
                }
                onPress={onConfirm}
                colorScheme={flowMode === 'find' ? 'secondary' : 'primary'}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(MapLocationPicker);

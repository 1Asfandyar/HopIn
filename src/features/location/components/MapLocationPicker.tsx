import { memo, useEffect, useRef } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, type Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { MapLocationPickerProps } from '../types';
import { MAP_LOCATION_PICKER_COPY } from '../constants/location.constants';

const MapLocationPicker = ({
  visible,
  inputType,
  region,
  cameraRequestKey,
  previewLocation,
  isWaitingForPreview,
  isLoadingPreview,
  isConfirming,
  error,
  onRegionChange,
  onUseCurrentLocation,
  onConfirm,
  onClose,
}: MapLocationPickerProps) => {
  const mapRef = useRef<MapView | null>(null);
  const latestRegionRef = useRef(region);
  const title =
    inputType === 'pickup'
      ? MAP_LOCATION_PICKER_COPY.pickupTitle
      : MAP_LOCATION_PICKER_COPY.destinationTitle;
  const detailHeading =
    inputType === 'pickup'
      ? MAP_LOCATION_PICKER_COPY.pickupHeading
      : MAP_LOCATION_PICKER_COPY.destinationHeading;
  const detailDescription =
    previewLocation?.address ?? MAP_LOCATION_PICKER_COPY.idleDescription;

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
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <Pressable onPress={onClose} hitSlop={16} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={themeColors.gray700} />
          </Pressable>
          <ThemedText weight="semiBold" className="text-base text-gray-900">
            {title}
          </ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
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
              <Ionicons
                name="location-sharp"
                size={42}
                color={themeColors.primary}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onUseCurrentLocation}
            style={styles.currentLocationButton}
          >
            <Ionicons
              name="navigate-circle"
              size={24}
              color={themeColors.primary}
            />
            <ThemedText weight="semiBold" className="text-primary text-sm ml-2">
              {MAP_LOCATION_PICKER_COPY.currentLocationButtonLabel}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View className="bg-white px-4 pt-4 pb-5 border-t border-gray-200 rounded-t-3xl">
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
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.white,
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
});

export default memo(MapLocationPicker);

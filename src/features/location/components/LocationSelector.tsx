import { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import { themeColors } from '@/theme/tokens';
import type { LocationSelectorViewProps } from '../types';
import { LOCATION_SELECTOR_COPY } from '../constants/location.constants';
import LocationInput from './LocationInput';
import MapLocationPicker from './MapLocationPicker';
import PlaceResultsList from './PlaceResultsList';

const LocationSelector = ({
  bottomSheetRef,
  snapPoints,
  topInset,
  activeInput,
  pickupQuery,
  destinationQuery,
  searchResults,
  isSearchingPlaces,
  placesError,
  pickup,
  destination,
  locationError,
  hasGooglePlacesApiKey,
  isLoadingCurrentLocation,
  canCloseLocationSheet,
  shouldShowResults,
  mapPickerInput,
  mapRegion,
  mapPreviewLocation,
  mapError,
  isWaitingForMapPreview,
  isLoadingMapPreview,
  isConfirmingMapLocation,
  dateTime,
  isDateTimePickerOpen,
  minDateTime,
  formatDateAndTime,
  onPickupChange,
  onDestinationChange,
  onActiveInputChange,
  onOpenLocationSheet,
  onOpenDateTimePicker,
  onCloseDateTimePicker,
  onDateTimeConfirm,
  onOpenMapPicker,
  onCloseMapPicker,
  onMapRegionChange,
  onUseDeviceLocationOnMap,
  onConfirmMapLocation,
  onPlaceSelected,
}: LocationSelectorViewProps) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.45}
        pressBehavior={canCloseLocationSheet ? 'close' : 'none'}
      />
    ),
    [canCloseLocationSheet],
  );

  return (
    <View className="bg-white flex-1">
      <TouchableOpacity onPress={onOpenLocationSheet} activeOpacity={0.7}>
        <View
          pointerEvents="none"
          className="mb-2 rounded-3xl border border-gray-200 bg-white p-4"
          style={{
            shadowColor: themeColors.black,
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <ThemedText weight="semiBold" className="text-base text-gray-900">
              {LOCATION_SELECTOR_COPY.routeSummaryTitle}
            </ThemedText>
            <Ionicons
              name="arrow-forward-circle"
              size={22}
              color={themeColors.gray400}
            />
          </View>

          <View className="gap-3">
            <View className="rounded-2xl bg-light-blue px-3 py-3">
              <ThemedText
                weight="semiBold"
                className="mb-1 text-[12px] uppercase tracking-wide text-primary"
              >
                {LOCATION_SELECTOR_COPY.fromLabel}
              </ThemedText>
              <ThemedText
                className={`text-sm ${pickup?.address ? 'text-gray-900' : 'text-gray-500'}`}
                numberOfLines={2}
              >
                {pickup?.address ?? LOCATION_SELECTOR_COPY.pickupPlaceholder}
              </ThemedText>
            </View>

            <View className="rounded-2xl bg-blue-100 px-3 py-3">
              <ThemedText
                weight="semiBold"
                className="mb-1 text-[12px] uppercase tracking-wide text-secondary"
              >
                {LOCATION_SELECTOR_COPY.toLabel}
              </ThemedText>
              <ThemedText
                className={`text-sm ${destination?.address ? 'text-gray-900' : 'text-blue-700'}`}
                numberOfLines={2}
              >
                {destination?.address ??
                  LOCATION_SELECTOR_COPY.routePlaceholder}
              </ThemedText>
            </View>

            <View className="rounded-2xl border border-gray-200 bg-white px-3 py-3">
              <ThemedText
                weight="semiBold"
                className="mb-1 text-[12px] uppercase tracking-wide text-gray-600"
              >
                {LOCATION_SELECTOR_COPY.dateTimeLabel}
              </ThemedText>
              <ThemedText
                className={`text-sm ${dateTime ? 'text-gray-900' : 'text-gray-500'}`}
                numberOfLines={2}
              >
                {dateTime
                  ? formatDateAndTime(dateTime)
                  : LOCATION_SELECTOR_COPY.dateTimePlaceholder}
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        topInset={topInset}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        enablePanDownToClose
        keyboardBehavior="fillParent"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetView className="flex-1 gap-2 mx-2">
          <View className='bg-gray-100 rounded-lg p-2 pt-4'>
            {isLoadingCurrentLocation && (
              <View className="px-2 pb-2 items-start">
                <BrandedLoader
                  variant="inline"
                  label={FEEDBACK_MESSAGES.currentLocationLoading}
                />
              </View>
            )}
            {locationError && (
              <ThemedText className="text-red-500 text-sm px-2 pb-2">
                {locationError.message}
              </ThemedText>
            )}
            {!hasGooglePlacesApiKey && (
              <ThemedText className="text-red-500 text-sm px-2 pb-2">
                {FEEDBACK_MESSAGES.missingGooglePlacesKey}
              </ThemedText>
            )}
          <LocationInput
            value={pickupQuery.length > 30 ? pickupQuery.slice(0, 30) + "..." : pickupQuery}
            onChangeText={onPickupChange}
            onFocus={() => onActiveInputChange('pickup')}
            placeholder={LOCATION_SELECTOR_COPY.pickupPlaceholder}
              leftIcon="locate"
              onRightButtonPress={() => onOpenMapPicker('pickup')}
              isSearching={activeInput === 'pickup' && isSearchingPlaces}
              rightButtonLabel={LOCATION_SELECTOR_COPY.mapButtonLabel}
          />
            <LocationInput
            value={destinationQuery.length > 30 ? destinationQuery.slice(0, 30) + "..." : destinationQuery}
            onChangeText={onDestinationChange}
            onFocus={() => onActiveInputChange('destination')}
            leftIcon="location"
              onRightButtonPress={() => onOpenMapPicker('destination')}
              placeholder={LOCATION_SELECTOR_COPY.destinationPlaceholder}
              isSearching={activeInput === 'destination' && isSearchingPlaces}
              rightButtonLabel={LOCATION_SELECTOR_COPY.mapButtonLabel}
            />
            <TouchableOpacity onPress={onOpenDateTimePicker} activeOpacity={0.7}>
              <View pointerEvents="none">
                <ThemedInput
                  placeholder={LOCATION_SELECTOR_COPY.dateTimeLabel}
                  leftIcon="calendar"
                  rightIcon="arrow-forward-circle"
                  value={formatDateAndTime(dateTime)}
                  editable={false}
                  weight="regular"
                  inputClassName="pl-2 text-base"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View className='bg-gray-100 p-2 rounded-lg'>
            {shouldShowResults && (
              <PlaceResultsList
                results={searchResults}
                isLoading={isSearchingPlaces}
                error={placesError}
                onPlacePress={onPlaceSelected}
              />
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <MapLocationPicker
        visible={mapPickerInput !== null}
        inputType={mapPickerInput}
        region={mapRegion}
        previewLocation={mapPreviewLocation}
        isWaitingForPreview={isWaitingForMapPreview}
        isLoadingPreview={isLoadingMapPreview}
        isConfirming={isConfirmingMapLocation}
        error={mapError}
        onRegionChange={onMapRegionChange}
        onUseCurrentLocation={onUseDeviceLocationOnMap}
        onConfirm={onConfirmMapLocation}
        onClose={onCloseMapPicker}
      />

      <DateTimePickerModal
        isVisible={isDateTimePickerOpen}
        mode="datetime"
        onConfirm={onDateTimeConfirm}
        onCancel={onCloseDateTimePicker}
        minimumDate={minDateTime}
        is24Hour={false}
      />
    </View>
  );
};

export default LocationSelector;

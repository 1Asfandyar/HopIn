import { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { useRideDateTime } from '@/features/rides/hooks/useRideDateTime';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import { useLocationStore } from '@/store/location.store';
import type { GooglePlaceData, GooglePlaceDetails } from '@/types/types';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import { mapGooglePlaceToLocation } from '../helpers/location.helpers';
import { useLocationSearch } from '../hooks/useLocationSearch';
import LocationInput from './LocationInput';

const LocationSelector = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const setCurrentLocation = useLocationStore(
    state => state.setCurrentLocation,
  );
  const { currentLocation, error, hasGooglePlacesApiKey, isLoading } =
    useLocationSearch();
  const { destination, setDestination, setPickup } = useRideDraft();
  const {
    closeDateTimePicker,
    dateTime,
    formateDateAndTime,
    handleDateTimeConfirm,
    isOpen,
    minDateTime,
    openDateTimePicker,
  } = useRideDateTime();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.45}
        pressBehavior="close"
      />
    ),
    [],
  );

  const openLocationSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleMapPress = () => {
    console.info('Open map pressed');
  };

  const handlePickupSelected = useCallback(
    (data: GooglePlaceData, details: GooglePlaceDetails | null) => {
      const location = mapGooglePlaceToLocation(data, details);

      if (!location) {
        return;
      }

      setCurrentLocation(location);
      setPickup(location);
    },
    [setCurrentLocation, setPickup],
  );

  const handleDestinationSelected = useCallback(
    (data: GooglePlaceData, details: GooglePlaceDetails | null) => {
      const location = mapGooglePlaceToLocation(data, details);

      if (!location) {
        return;
      }

      setDestination(location);
    },
    [setDestination],
  );

  return (
    <View className="bg-white flex-1">
      <TouchableOpacity onPress={openLocationSheet} activeOpacity={0.7}>
        <View pointerEvents="none">
          <ThemedInput
            leftIcon="car-sharp"
            rightIcon="arrow-forward-circle"
            placeholder="Where to?"
            value={destination?.address ?? ''}
            weight="semiBold"
            inputClassName="pl-8"
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={openDateTimePicker} activeOpacity={0.7}>
        <ThemedInput
          placeholder="Date & Time"
          leftIcon="calendar"
          containerClassName="mb-6"
          rightIcon="arrow-forward-circle"
          value={formateDateAndTime(dateTime)}
          editable={false}
          pointerEvents="none"
          weight="semiBold"
          inputClassName="pl-8"
        />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        enablePanDownToClose
      >
        <BottomSheetView className="flex-1 px-2 rounded-lg pt-2 mt-2 mx-2 bg-gray-100">
          {!hasGooglePlacesApiKey && (
            <ThemedText className="text-red-500 text-sm px-2 pb-2">
              {FEEDBACK_MESSAGES.missingGooglePlacesKey}
            </ThemedText>
          )}
          {isLoading && (
            <View className="px-2 pb-2 items-start">
              <BrandedLoader
                variant="inline"
                label={FEEDBACK_MESSAGES.currentLocationLoading}
              />
            </View>
          )}
          {error && (
            <ThemedText className="text-red-500 text-sm px-2 pb-2">
              {error.message}
            </ThemedText>
          )}
          <LocationInput
            initialValue={currentLocation?.address}
            placeholder="Current Location"
            leftIcon="locate"
            onRightButtonPress={handleMapPress}
            onPlaceSelected={handlePickupSelected}
            rightButtonLabel="Map"
          />
          <LocationInput
            initialValue={destination?.address}
            leftIcon="location"
            onPlaceSelected={handleDestinationSelected}
            onRightButtonPress={handleMapPress}
            placeholder="Where to?"
            rightButtonLabel="Map"
          />
        </BottomSheetView>
      </BottomSheetModal>

      <DateTimePickerModal
        isVisible={isOpen}
        mode="datetime"
        onConfirm={handleDateTimeConfirm}
        onCancel={closeDateTimePicker}
        minimumDate={minDateTime}
        is24Hour={false}
      />
    </View>
  );
};

export default LocationSelector;

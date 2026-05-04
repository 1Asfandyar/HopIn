import { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import ThemedInput from '@/theme/components/ThemedInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RideProps } from '@/features/main/types';
import LocationInput from './LocationInput';

const LocationSelector = ({
  dateTime,
  formateDateAndTime,
  openDateTimePicker,
  closeDateTimePicker,
  handleDateTimeConfirm,
  isOpen,
  minDateTime,
}: RideProps) => {

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);

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

  return (
    <View className="bg-white flex-1">
      <TouchableOpacity onPress={openLocationSheet} activeOpacity={0.7}>
        <View pointerEvents="none">
          <ThemedInput
            leftIcon="car-sharp"
            rightIcon="arrow-forward-circle"
            placeholder="Where to?"
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
        <BottomSheetView className="flex-1 px-2 rounded-lg  pt-2 mt-2 mx-2 bg-gray-100 ">
          <LocationInput
            placeholder='Current Location'
            leftIcon= 'locate'
            onPlaceSelected={()=> console.log('Current location changed')}
          />
          <LocationInput
            leftIcon='location'
            onPlaceSelected={()=>console.log('where to changed')}
            placeholder='Where to?'
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

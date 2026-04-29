import { View, TouchableOpacity } from 'react-native'
import ThemedInput from '@/theme/components/ThemedInput'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { RideProps } from '@/features/main/types'

const LocationSelector = ({
  dateTime,
  formateDateAndTime,
  openDateTimePicker,
  closeDateTimePicker,
  handleDateTimeConfirm,
  isOpen,
  minDateTime,
}: RideProps) => {
  return (
    <View className="flex-1 bg-white px-5 py-0">
      <ThemedInput
        placeholder="From"
        leftIcon="radio-button-on"
        containerClassName="mt-4"
        rightIcon="search"
      />
      <View className="w-0.5 h-10 bg-primary ml-3 mb-2" />
      <ThemedInput
        placeholder="To"
        leftIcon="location"
        containerClassName="mb-6"
        rightIcon="search"
      />
      
      <TouchableOpacity onPress={openDateTimePicker} activeOpacity={0.7}>
        <ThemedInput
          placeholder="Date & Time"
          leftIcon="calendar"
          containerClassName="mb-6"
          rightIcon="search"
          value={formateDateAndTime(dateTime)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isOpen}
        mode="datetime"
        onConfirm={handleDateTimeConfirm}
        onCancel={closeDateTimePicker}
        minimumDate={minDateTime}
        is24Hour={false}
      />
    </View>
  )
}

export default LocationSelector
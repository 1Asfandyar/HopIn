import LocationSelector from '@/components/LocationSelector';
import { RideProps } from '../../types';
import ThemedCard from '@/theme/components/ThemedCard';
import { ScrollView, View } from 'react-native';
import ThemedButton from '@/theme/components/ThemedButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const OfferRideScreen = ({
  dateTime,
  setDateTime,
  formateDateAndTime,
  openDateTimePicker,
  closeDateTimePicker,
  handleDateTimeConfirm,
  isOpen,
  minDateTime,
}: RideProps) => {
  return (
    <SafeAreaView className='flex-1 px-5' edges={['bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ zIndex: 9999 }}>
          <LocationSelector
            dateTime={dateTime}
            setDateTime={setDateTime}
            formateDateAndTime={formateDateAndTime}
            openDateTimePicker={openDateTimePicker}
            closeDateTimePicker={closeDateTimePicker}
            handleDateTimeConfirm={handleDateTimeConfirm}
            isOpen={isOpen}
            minDateTime={minDateTime}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OfferRideScreen;

import LocationSelector from '@/components/LocationSelector';
import { RideProps } from '../../types';
import ThemedCard from '@/theme/components/ThemedCard';
import { View } from 'react-native';
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
        <View className='flex-1 pt-10 justify-between'>
          <ThemedCard
            heading='Seats Available'
            subHeading='(You have 4 spare seats)'
            variant='outline'
            iconSize={30}
            leftIcon='people'
          />
          <ThemedCard
            heading='Price Per Seat'
            subHeading='(Recommened: Rs - Rs)'
            variant='outline'
            leftIcon='pricetag'
            iconSize={30}
          />
          <ThemedCard
            heading='Car details'
            subHeading='(Recommened: Rs - Rs)'
            variant='outline'
            leftIcon='car'
            iconSize={30}
          />
          <ThemedButton
            title= 'Publish Ride'
            textClassName='text-xl'
            weight='regular'
          />
        </View>

    </SafeAreaView>
  );
};

export default OfferRideScreen;

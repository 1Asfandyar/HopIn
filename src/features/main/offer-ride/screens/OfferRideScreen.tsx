import LocationSelector from '@/features/location/components/LocationSelector';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OfferRideScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-5" edges={['bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ zIndex: 9999 }}>
          <LocationSelector />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OfferRideScreen;

import LocationSelectorScreen from '@/features/location/screens/LocationSelectorScreen';
import LocationSelectorLayout from '@/features/location/components/LocationSelectorLayout';

const FindRideScreen = () => {
  return (
    <LocationSelectorLayout>
      <LocationSelectorScreen />
    </LocationSelectorLayout>
  );
};

export default FindRideScreen;

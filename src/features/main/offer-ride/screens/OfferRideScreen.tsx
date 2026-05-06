import LocationSelectorScreen from '@/features/location/screens/LocationSelectorScreen';
import LocationSelectorLayout from '@/features/location/components/LocationSelectorLayout';

const OfferRideScreen = () => {
  return (
    <LocationSelectorLayout>
      <LocationSelectorScreen />
    </LocationSelectorLayout>
  );
};

export default OfferRideScreen;

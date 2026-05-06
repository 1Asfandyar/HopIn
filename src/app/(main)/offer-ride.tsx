import OfferRideScreen from '@/features/main/offer-ride/screens/OfferRideScreen';
import { useLocationSelectorScreenProps } from '@/features/location/hooks/useLocationSelectorScreenProps';

const OfferRide = () => {
  const locationSelectorProps = useLocationSelectorScreenProps();

  return <OfferRideScreen {...locationSelectorProps} />;
};

export default OfferRide;

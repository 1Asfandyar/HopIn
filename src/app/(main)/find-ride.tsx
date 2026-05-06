import FindRideScreen from '@/features/main/find-ride/screens/FindRideScreen';
import { useLocationSelectorScreenProps } from '@/features/location/hooks/useLocationSelectorScreenProps';

const FindRide = () => {
  const locationSelectorProps = useLocationSelectorScreenProps();

  return <FindRideScreen {...locationSelectorProps} />;
};

export default FindRide;

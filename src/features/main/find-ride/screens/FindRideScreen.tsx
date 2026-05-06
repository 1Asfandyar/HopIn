import LocationSelectorScreen from '@/features/location/screens/LocationSelectorScreen';
import type { LocationSelectorViewProps } from '@/features/location/types';

const FindRideScreen = (props: LocationSelectorViewProps) => {
  return <LocationSelectorScreen {...props} />;
};

export default FindRideScreen;

import type { LocationSelectorViewProps } from '../types';
import LocationSelector from '../components/LocationSelector';
import LocationSelectorLayout from '../components/LocationSelectorLayout';

const LocationSelectorScreen = (props: LocationSelectorViewProps) => {
  return (
    <LocationSelectorLayout>
      <LocationSelector {...props} />
    </LocationSelectorLayout>
  );
};

export default LocationSelectorScreen;

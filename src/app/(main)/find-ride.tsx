import { useState } from 'react';
import { Alert } from 'react-native';
import FindRideScreen from '@/features/main/find-ride/screens/FindRideScreen';
import { useLocationSelectorScreenProps } from '@/features/location/hooks/useLocationSelectorScreenProps';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import { ridesService } from '@/services/ridesService';
import { getErrorMessage } from '@/utils/errors';

const FindRide = () => {
  const { draft } = useRideDraft();
  const [isSearching, setSearching] = useState(false);

  const handleFindRides = async () => {
    setSearching(true);

    try {
      const matches = await ridesService.search(draft);
      Alert.alert(
        matches.length > 0 ? 'Search ready' : 'No rides found',
        matches.length > 0
          ? 'We found your route details. Matching ride cards can be connected here next.'
          : 'Try changing your pickup, destination, or time.',
      );
    } catch (error) {
      Alert.alert(
        "Couldn't search rides",
        getErrorMessage(
          error,
          'Please choose pickup, destination, and departure time.',
        ),
      );
    } finally {
      setSearching(false);
    }
  };

  const locationSelectorProps = useLocationSelectorScreenProps({
    flowMode: 'find',
    roleLabel: 'Rider mode',
    heading: 'Find rides going your way',
    description:
      'Choose where you are starting, where you are going, and when you want to leave.',
    submitLabel: 'Find Rides',
    submittingLabel: 'Finding rides...',
    onSubmit: handleFindRides,
    isSubmitting: isSearching,
  });

  return <FindRideScreen {...locationSelectorProps} />;
};

export default FindRide;

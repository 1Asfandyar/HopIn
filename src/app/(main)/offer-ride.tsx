import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import OfferRideScreen from '@/features/main/offer-ride/screens/OfferRideScreen';
import { useLocationSelectorScreenProps } from '@/features/location/hooks/useLocationSelectorScreenProps';
import { APP_ROUTES } from '@/constants/appRoutes';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import { ridesService } from '@/services/ridesService';
import { getErrorMessage } from '@/utils/errors';

const OfferRide = () => {
  const router = useRouter();
  const { draft, resetDraft } = useRideDraft();
  const [isPosting, setPosting] = useState(false);

  const handlePostRide = async () => {
    setPosting(true);

    try {
      const offer = await ridesService.createOffer(draft);
      resetDraft();
      Alert.alert(
        'Ride posted',
        `Your ride to ${offer.destination.address} is live. We'll notify you when riders request a seat.`,
        [
          {
            text: 'Done',
            onPress: () => router.replace(APP_ROUTES.main.home),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "Couldn't post ride",
        getErrorMessage(
          error,
          'Please choose pickup, destination, and departure time.',
        ),
      );
    } finally {
      setPosting(false);
    }
  };

  const locationSelectorProps = useLocationSelectorScreenProps({
    flowMode: 'offer',
    roleLabel: 'Driver mode',
    heading: 'Post your ride',
    description:
      'Choose your route and departure time so riders going the same way can request a seat.',
    submitLabel: 'Post Ride',
    submittingLabel: 'Posting ride...',
    onSubmit: handlePostRide,
    isSubmitting: isPosting,
  });

  return <OfferRideScreen {...locationSelectorProps} />;
};

export default OfferRide;

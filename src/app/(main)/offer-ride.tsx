import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Redirect, useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import { USER_ROLES } from '@/constants/roles';
import OfferRideScreen from '@/features/main/offer-ride/screens/OfferRideScreen';
import { useLocationSelectorScreenProps } from '@/features/location/hooks/useLocationSelectorScreenProps';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import RideResultsSheet from '@/features/rides/components/RideResultsSheet';
import { ridesService } from '@/services/ridesService';
import { useAuthStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/errors';
import type { RideRequestPost } from '@/types/types';

const OfferRide = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const { draft, resetDraft } = useRideDraft();
  const rideRequestsSheetRef = useRef<BottomSheetModal>(null);
  const [requests, setRequests] = useState<RideRequestPost[]>([]);
  const [isPosting, setPosting] = useState(false);
  const [postedOfferId, setPostedOfferId] = useState<string | null>(null);

  const openRequestsSheet = () => {
    requestAnimationFrame(() => {
      rideRequestsSheetRef.current?.present();
    });
  };

  const handlePostRide = async () => {
    setPosting(true);

    try {
      const offer = await ridesService.createOffer(draft);
      const openRequests = await ridesService.listOpenRequests();
      setPostedOfferId(offer.id);
      setRequests(openRequests);
      resetDraft();
      openRequestsSheet();
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

  const openRequestDetails = (request: RideRequestPost) => {
    rideRequestsSheetRef.current?.dismiss();
    router.push({
      pathname: '/(main)/ride-details',
      params: {
        rideType: 'request',
        rideId: request.id,
        offerId: postedOfferId ?? '',
      },
    });
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

  if (user?.role === USER_ROLES.rider) {
    return <Redirect href={APP_ROUTES.main.home} />;
  }

  return (
    <>
      <OfferRideScreen {...locationSelectorProps} />
      <RideResultsSheet
        ref={rideRequestsSheetRef}
        title="Rider requests"
        emptyTitle="Ride posted"
        emptyDescription="Your ride is live. Rider requests will appear here when people need a seat."
        itemLabel="request"
        rides={requests}
        rideType="request"
        colorScheme="primary"
        onRidePress={ride => openRequestDetails(ride as RideRequestPost)}
      />
    </>
  );
};

export default OfferRide;

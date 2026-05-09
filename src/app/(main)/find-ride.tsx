import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Redirect, useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import { USER_ROLES } from '@/constants/roles';
import FindRideScreen from '@/features/main/find-ride/screens/FindRideScreen';
import { useLocationSelectorScreenProps } from '@/features/location/hooks/useLocationSelectorScreenProps';
import { useRideDraft } from '@/features/rides/hooks/useRideDraft';
import RideResultsSheet from '@/features/rides/components/RideResultsSheet';
import { ridesService } from '@/services/ridesService';
import { useAuthStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/errors';
import type { RideOffer } from '@/types/types';

const FindRide = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const { draft } = useRideDraft();
  const rideResultsSheetRef = useRef<BottomSheetModal>(null);
  const [matches, setMatches] = useState<RideOffer[]>([]);
  const [isSearching, setSearching] = useState(false);
  const [isPostingRequest, setPostingRequest] = useState(false);

  const openResultsSheet = () => {
    requestAnimationFrame(() => {
      rideResultsSheetRef.current?.present();
    });
  };

  const handleFindRides = async () => {
    setSearching(true);

    try {
      const rideMatches = await ridesService.search(draft);
      setMatches(rideMatches);
      openResultsSheet();
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

  const handlePostRequest = async () => {
    setPostingRequest(true);

    try {
      await ridesService.createRequest(draft);
      rideResultsSheetRef.current?.dismiss();
      Alert.alert(
        'Request posted',
        "We'll notify you when a driver posts a matching ride.",
      );
    } catch (error) {
      Alert.alert(
        "Couldn't post request",
        getErrorMessage(
          error,
          'Please choose pickup, destination, and departure time.',
        ),
      );
    } finally {
      setPostingRequest(false);
    }
  };

  const openRideDetails = (ride: RideOffer) => {
    rideResultsSheetRef.current?.dismiss();
    router.push({
      pathname: '/(main)/ride-details',
      params: {
        rideType: 'offer',
        rideId: ride.id,
      },
    });
  };

  const locationSelectorProps = useLocationSelectorScreenProps({
    flowMode: 'find',
    roleLabel: 'Rider mode',
    heading: 'Find rides going your way',
    description:
      'Choose where you are starting, where you are going, and when you want to leave.',
    submitLabel: 'Search Drivers',
    submittingLabel: 'Searching drivers...',
    onSubmit: handleFindRides,
    isSubmitting: isSearching,
  });

  if (user?.role === USER_ROLES.driver) {
    return <Redirect href={APP_ROUTES.main.home} />;
  }

  return (
    <>
      <FindRideScreen {...locationSelectorProps} />
      <RideResultsSheet
        ref={rideResultsSheetRef}
        title="Available drivers"
        emptyTitle="No drivers available"
        emptyDescription="Post a request so drivers can see your route."
        itemLabel="driver"
        rides={matches}
        rideType="offer"
        colorScheme="secondary"
        isPostingRequest={isPostingRequest}
        postRequestLabel="Post request"
        onPostRequest={handlePostRequest}
        onRidePress={ride => openRideDetails(ride as RideOffer)}
      />
    </>
  );
};

export default FindRide;

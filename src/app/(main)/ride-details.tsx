import { useState } from 'react';
import { Alert } from 'react-native';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import { USER_ROLES } from '@/constants/roles';
import { openRouteInMaps } from '@/features/location/helpers/location.helpers';
import RideDetailsScreen from '@/features/main/rides/screens/RideDetailsScreen';
import { useRideDetails } from '@/features/rides/hooks/useRideDetails';
import { ridesService } from '@/services/ridesService';
import { useAuthStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/errors';
import type { RideRecordType } from '@/types/types';

const getRideType = (rideType?: string | string[]): RideRecordType => {
  return rideType === 'request' ? 'request' : 'offer';
};

const getParam = (param?: string | string[]) => {
  return Array.isArray(param) ? param[0] : param;
};

const RideDetails = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const params = useLocalSearchParams<{
    rideType?: string;
    rideId?: string;
    offerId?: string;
  }>();
  const rideType = getRideType(params.rideType);
  const rideId = getParam(params.rideId);
  const offerId = getParam(params.offerId);
  const { ride, isLoading, errorMessage, reload } = useRideDetails(
    rideType,
    rideId,
  );
  const [isSubmitting, setSubmitting] = useState(false);

  if (
    (rideType === 'offer' && user?.role === USER_ROLES.driver) ||
    (rideType === 'request' && user?.role === USER_ROLES.rider)
  ) {
    return <Redirect href={APP_ROUTES.main.home} />;
  }

  const handleOpenRoute = async () => {
    if (!ride) {
      return;
    }

    try {
      await openRouteInMaps(ride.pickup, ride.destination);
    } catch (error) {
      Alert.alert(
        "Couldn't open maps",
        getErrorMessage(error, 'Please try again in a moment.'),
      );
    }
  };

  const handlePrimaryAction = async () => {
    if (!rideId) {
      return;
    }

    setSubmitting(true);

    try {
      if (rideType === 'offer') {
        await ridesService.joinOffer(rideId);
        Alert.alert('Seat booked', 'This ride is now saved in My Rides.');
      } else {
        await ridesService.acceptRequest(rideId, offerId || undefined);
        Alert.alert(
          'Request accepted',
          'This rider is now scheduled with you.',
        );
      }

      router.replace(APP_ROUTES.main.rides);
    } catch (error) {
      Alert.alert(
        rideType === 'offer' ? "Couldn't book seat" : "Couldn't accept request",
        getErrorMessage(error, 'Please try again in a moment.'),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RideDetailsScreen
      ride={ride}
      rideType={rideType}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      onPrimaryAction={handlePrimaryAction}
      onOpenRoute={handleOpenRoute}
      onRefresh={reload}
    />
  );
};

export default RideDetails;

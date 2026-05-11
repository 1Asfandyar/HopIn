import { Alert } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import { USER_ROLES } from '@/constants/roles';
import { RIDE_MATCHING_COPY } from '@/features/rides/constants/rideMatching.constants';
import { useRideDateTime } from '@/features/rides/hooks/useRideDateTime';
import { useRideMatchSearch } from '@/features/rides/hooks/useRideMatchSearch';
import RideSearchResultsScreen from '@/features/rides/screens/RideSearchResultsScreen';
import { useAuthStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/errors';
import type { RideFlowMode, RideRecord } from '@/types/types';

const RideResults = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const flowMode: RideFlowMode =
    user?.role === USER_ROLES.driver ? 'offer' : 'find';
  const copy = RIDE_MATCHING_COPY[flowMode];
  const rideDateTime = useRideDateTime();
  const {
    rides,
    rideType,
    isLoading,
    isPosting,
    errorMessage,
    hasRoute,
    hasDepartureTime,
    postRide,
    resetDraft,
  } = useRideMatchSearch(flowMode);

  const openRideDetails = (ride: RideRecord) => {
    router.push({
      pathname: '/(main)/ride-details',
      params: {
        rideType,
        rideId: ride.id,
      },
    });
  };

  const handlePost = async () => {
    try {
      await postRide();
      resetDraft();
      Alert.alert(copy.successTitle, copy.successMessage);
      router.replace(APP_ROUTES.main.rides);
    } catch (error) {
      Alert.alert(
        flowMode === 'find' ? "Couldn't post request" : "Couldn't post ride",
        getErrorMessage(
          error,
          'Please choose pickup, destination, and departure time.',
        ),
      );
    }
  };

  const handleCancel = () => {
    resetDraft();
    router.replace(APP_ROUTES.main.home);
  };

  if (!hasRoute) {
    return <Redirect href={APP_ROUTES.main.setRideDetails} />;
  }

  return (
    <RideSearchResultsScreen
      flowMode={flowMode}
      title={copy.resultsTitle}
      subtitle={copy.resultsSubtitle}
      emptyTitle={copy.emptyTitle}
      emptyDescription={copy.emptyDescription}
      loadingLabel={copy.loadingLabel}
      itemLabel={copy.itemLabel}
      rides={rides}
      isLoading={isLoading}
      errorMessage={errorMessage}
      hasDepartureTime={hasDepartureTime}
      dateTime={rideDateTime.dateTime}
      isDateTimePickerOpen={rideDateTime.isOpen}
      minDateTime={rideDateTime.minDateTime}
      formatDateAndTime={rideDateTime.formatDateAndTime}
      isPosting={isPosting}
      postLabel={copy.postLabel}
      postingLabel={copy.postingLabel}
      disabledPostLabel={copy.disabledPostLabel}
      onOpenDateTimePicker={rideDateTime.openDateTimePicker}
      onCloseDateTimePicker={rideDateTime.closeDateTimePicker}
      onDateTimeConfirm={rideDateTime.handleDateTimeConfirm}
      onPost={handlePost}
      onCancel={handleCancel}
      onRidePress={openRideDetails}
    />
  );
};

export default RideResults;

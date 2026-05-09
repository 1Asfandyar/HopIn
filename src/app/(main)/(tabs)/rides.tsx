import { useState } from 'react';
import { Alert } from 'react-native';
import MyRidesScreen from '@/features/main/rides/screens/MyRidesScreen';
import { MY_RIDES_TABS } from '@/features/rides/constants/rides.constants';
import { useMyRides } from '@/features/rides/hooks/useMyRides';
import { getErrorMessage } from '@/utils/errors';
import type { MyRide, MyRideLifecycle } from '@/types/types';

const Rides = () => {
  const [activeTab, setActiveTab] = useState<MyRideLifecycle>(
    MY_RIDES_TABS.upcoming,
  );
  const {
    rides,
    isLoading,
    isRefreshing,
    deletingRideKey,
    errorMessage,
    refresh,
    deleteRide,
  } = useMyRides();

  const handleDeleteRide = (ride: MyRide) => {
    const message =
      ride.lifecycle === MY_RIDES_TABS.completed
        ? 'Remove this completed ride from My Rides?'
        : 'Delete this upcoming ride? If it is booked, the booking will be cancelled.';

    Alert.alert('Delete ride', message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteRide(ride);
          } catch (error) {
            Alert.alert(
              "Couldn't delete ride",
              getErrorMessage(error, 'Please try again in a moment.'),
            );
          }
        },
      },
    ]);
  };

  return (
    <MyRidesScreen
      activeTab={activeTab}
      rides={rides}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      deletingRideKey={deletingRideKey}
      errorMessage={errorMessage}
      onTabChange={setActiveTab}
      onDeleteRide={handleDeleteRide}
      onRefresh={refresh}
    />
  );
};

export default Rides;

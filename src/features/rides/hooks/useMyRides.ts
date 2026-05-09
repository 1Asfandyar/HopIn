import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { USER_ROLES } from '@/constants/roles';
import { ridesService } from '@/services/ridesService';
import { useAuthStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/errors';
import type { MyRide, MyRidesSummary } from '@/types/types';

const EMPTY_MY_RIDES: MyRidesSummary = {
  upcoming: [],
  completed: [],
};

export const useMyRides = () => {
  const role = useAuthStore(state => state.user?.role ?? USER_ROLES.rider);
  const [rides, setRides] = useState<MyRidesSummary>(EMPTY_MY_RIDES);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [deletingRideKey, setDeletingRideKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadRides = useCallback(
    async (refreshing = false) => {
      if (refreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const nextRides = await ridesService.listMyRides(role);
        setRides(nextRides);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(
          getErrorMessage(error, "Couldn't load your rides right now."),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [role],
  );

  useFocusEffect(
    useCallback(() => {
      loadRides();
    }, [loadRides]),
  );

  const refresh = useCallback(() => {
    loadRides(true);
  }, [loadRides]);

  const deleteRide = useCallback(
    async (ride: MyRide) => {
      const rideKey = `${ride.kind}-${ride.id}`;
      setDeletingRideKey(rideKey);

      try {
        await ridesService.deleteMyRide(ride);
        await loadRides(true);
      } finally {
        setDeletingRideKey(null);
      }
    },
    [loadRides],
  );

  return {
    rides,
    isLoading,
    isRefreshing,
    deletingRideKey,
    errorMessage,
    refresh,
    deleteRide,
  };
};

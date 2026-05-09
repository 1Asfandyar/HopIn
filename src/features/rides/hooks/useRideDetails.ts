import { useCallback, useEffect, useState } from 'react';
import { ridesService } from '@/services/ridesService';
import { getErrorMessage } from '@/utils/errors';
import type { RideOffer, RideRecordType, RideRequestPost } from '@/types/types';

export const useRideDetails = (rideType: RideRecordType, rideId?: string) => {
  const [ride, setRide] = useState<RideOffer | RideRequestPost | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadRide = useCallback(async () => {
    if (!rideId) {
      setErrorMessage('Ride details are missing.');
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const nextRide = await ridesService.getRideById(rideType, rideId);
      setRide(nextRide);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Couldn't load this ride right now."),
      );
    } finally {
      setLoading(false);
    }
  }, [rideId, rideType]);

  useEffect(() => {
    loadRide();
  }, [loadRide]);

  return {
    ride,
    isLoading,
    errorMessage,
    reload: loadRide,
  };
};

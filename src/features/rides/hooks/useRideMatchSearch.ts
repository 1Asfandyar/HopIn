import { useCallback, useEffect, useState } from 'react';
import { ridesService } from '@/services/ridesService';
import { getErrorMessage } from '@/utils/errors';
import { useRideDraft } from './useRideDraft';
import type {
  RideFlowMode,
  RideOffer,
  RideRecord,
  RideRecordType,
  RideRequestPost,
} from '@/types/types';

const getResultRideType = (flowMode: RideFlowMode): RideRecordType =>
  flowMode === 'find' ? 'offer' : 'request';

export const useRideMatchSearch = (flowMode: RideFlowMode) => {
  const { draft, resetDraft } = useRideDraft();
  const [rides, setRides] = useState<RideRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasRoute = Boolean(draft.pickup && draft.destination);
  const hasDepartureTime = Boolean(draft.departureTime);
  const rideType = getResultRideType(flowMode);

  const loadMatches = useCallback(async () => {
    if (!hasRoute) {
      setRides([]);
      setErrorMessage(null);
      return;
    }

    setIsLoading(true);

    try {
      const matches =
        flowMode === 'find'
          ? await ridesService.search(draft)
          : await ridesService.searchRequests(draft);
      setRides(matches);
      setErrorMessage(null);
    } catch (error) {
      setRides([]);
      setErrorMessage(getErrorMessage(error, "Couldn't load matches."));
    } finally {
      setIsLoading(false);
    }
  }, [draft, flowMode, hasRoute]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const postRide = useCallback(async (): Promise<
    RideOffer | RideRequestPost
  > => {
    setIsPosting(true);

    try {
      return flowMode === 'find'
        ? await ridesService.createRequest(draft)
        : await ridesService.createOffer(draft);
    } finally {
      setIsPosting(false);
    }
  }, [draft, flowMode]);

  return {
    rides,
    rideType,
    isLoading,
    isPosting,
    errorMessage,
    hasRoute,
    hasDepartureTime,
    loadMatches,
    postRide,
    resetDraft,
  };
};

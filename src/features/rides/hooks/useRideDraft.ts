import {
  selectRideDepartureTime,
  selectRideDestination,
  selectRideDraft,
  selectRidePickup,
  useRidesStore,
} from '@/store/rides.store';

export const useRideDraft = () => {
  const draft = useRidesStore(selectRideDraft);
  const pickup = useRidesStore(selectRidePickup);
  const destination = useRidesStore(selectRideDestination);
  const departureTime = useRidesStore(selectRideDepartureTime);
  const setPickup = useRidesStore(state => state.setPickup);
  const setDestination = useRidesStore(state => state.setDestination);
  const setDepartureTime = useRidesStore(state => state.setDepartureTime);
  const resetDraft = useRidesStore(state => state.resetDraft);

  return {
    draft,
    pickup,
    destination,
    departureTime,
    setPickup,
    setDestination,
    setDepartureTime,
    resetDraft,
  };
};

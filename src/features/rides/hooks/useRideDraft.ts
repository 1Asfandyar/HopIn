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
  const clearPickup = useRidesStore(state => state.clearPickup);
  const setDestination = useRidesStore(state => state.setDestination);
  const clearDestination = useRidesStore(state => state.clearDestination);
  const setDepartureTime = useRidesStore(state => state.setDepartureTime);
  const resetDraft = useRidesStore(state => state.resetDraft);

  return {
    draft,
    pickup,
    destination,
    departureTime,
    setPickup,
    clearPickup,
    setDestination,
    clearDestination,
    setDepartureTime,
    resetDraft,
  };
};

import {
  selectRideDepartureTime,
  selectRideDestination,
  selectRideDraft,
  selectRidePickup,
  selectRideSeats,
  useRidesStore,
} from '@/store/rides.store';

export const useRideDraft = () => {
  const draft = useRidesStore(selectRideDraft);
  const pickup = useRidesStore(selectRidePickup);
  const destination = useRidesStore(selectRideDestination);
  const departureTime = useRidesStore(selectRideDepartureTime);
  const seats = useRidesStore(selectRideSeats);
  const setPickup = useRidesStore(state => state.setPickup);
  const clearPickup = useRidesStore(state => state.clearPickup);
  const setDestination = useRidesStore(state => state.setDestination);
  const clearDestination = useRidesStore(state => state.clearDestination);
  const setDepartureTime = useRidesStore(state => state.setDepartureTime);
  const setSeats = useRidesStore(state => state.setSeats);
  const resetDraft = useRidesStore(state => state.resetDraft);

  return {
    draft,
    pickup,
    destination,
    departureTime,
    seats,
    setPickup,
    clearPickup,
    setDestination,
    clearDestination,
    setDepartureTime,
    setSeats,
    resetDraft,
  };
};

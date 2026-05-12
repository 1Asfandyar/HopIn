import { create } from 'zustand';
import type { RidesStore } from '@/types/types';
import { initialRideDraft } from '@/features/rides/constants/rideDraft';
import { RIDE_SEAT_LIMITS } from '@/features/rides/constants/rides.constants';

const clampSeatCount = (seats: number) =>
  Math.min(RIDE_SEAT_LIMITS.max, Math.max(RIDE_SEAT_LIMITS.min, seats));

export const useRidesStore = create<RidesStore>(set => ({
  draft: initialRideDraft,

  setPickup: pickup => {
    set(state => ({ draft: { ...state.draft, pickup } }));
  },

  clearPickup: () => {
    set(state => ({ draft: { ...state.draft, pickup: null } }));
  },

  setDestination: destination => {
    set(state => ({ draft: { ...state.draft, destination } }));
  },

  clearDestination: () => {
    set(state => ({ draft: { ...state.draft, destination: null } }));
  },

  setDepartureTime: departureTime => {
    set(state => ({
      draft: {
        ...state.draft,
        departureTime: departureTime?.toISOString() ?? null,
      },
    }));
  },

  setSeats: seats => {
    set(state => ({
      draft: {
        ...state.draft,
        seats: seats === null ? null : clampSeatCount(seats),
      },
    }));
  },

  resetDraft: () => {
    set({ draft: initialRideDraft });
  },
}));

export const selectRideDraft = (state: RidesStore) => state.draft;
export const selectRidePickup = (state: RidesStore) => state.draft.pickup;
export const selectRideDestination = (state: RidesStore) =>
  state.draft.destination;
export const selectRideDepartureTime = (state: RidesStore) =>
  state.draft.departureTime;
export const selectRideSeats = (state: RidesStore) => state.draft.seats;

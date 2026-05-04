import { create } from 'zustand';
import type { RideDraft, RidesStore } from '@/types/types';

const initialDraft: RideDraft = {
  pickup: null,
  destination: null,
  departureTime: null,
};

export const useRidesStore = create<RidesStore>(set => ({
  draft: initialDraft,

  setPickup: pickup => {
    set(state => ({ draft: { ...state.draft, pickup } }));
  },

  setDestination: destination => {
    set(state => ({ draft: { ...state.draft, destination } }));
  },

  setDepartureTime: departureTime => {
    set(state => ({
      draft: {
        ...state.draft,
        departureTime: departureTime?.toISOString() ?? null,
      },
    }));
  },

  resetDraft: () => {
    set({ draft: initialDraft });
  },
}));

export const selectRideDraft = (state: RidesStore) => state.draft;
export const selectRidePickup = (state: RidesStore) => state.draft.pickup;
export const selectRideDestination = (state: RidesStore) =>
  state.draft.destination;
export const selectRideDepartureTime = (state: RidesStore) =>
  state.draft.departureTime;

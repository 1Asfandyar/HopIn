import { create } from 'zustand';
import type { RidesStore } from '@/types/types';
import { initialRideDraft } from '@/features/rides/constants/rideDraft';

export const useRidesStore = create<RidesStore>(set => ({
  draft: initialRideDraft,

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
    set({ draft: initialRideDraft });
  },
}));

export const selectRideDraft = (state: RidesStore) => state.draft;
export const selectRidePickup = (state: RidesStore) => state.draft.pickup;
export const selectRideDestination = (state: RidesStore) =>
  state.draft.destination;
export const selectRideDepartureTime = (state: RidesStore) =>
  state.draft.departureTime;

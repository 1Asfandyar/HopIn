import type { RideDraft, RideOffer, RideRequest } from '@/types/types';

const assertCompleteDraft = (draft: RideDraft): RideRequest => {
  if (!draft.pickup || !draft.destination || !draft.departureTime) {
    throw new Error('Pickup, destination, and departure time are required.');
  }

  return {
    pickup: draft.pickup,
    destination: draft.destination,
    departureTime: draft.departureTime,
  };
};

export const ridesService = {
  createOffer: async (draft: RideDraft): Promise<RideOffer> => {
    const offer = assertCompleteDraft(draft);

    return { ...offer };
  },

  search: async (draft: RideDraft): Promise<RideRequest[]> => {
    return [assertCompleteDraft(draft)];
  },
};

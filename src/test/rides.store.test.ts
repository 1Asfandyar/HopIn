import { beforeEach, describe, expect, it } from '@jest/globals';
import { useRidesStore } from '@/store/rides.store';
import type { AppLocation } from '@/types/types';

const location: AppLocation = {
  latitude: 24.8607,
  longitude: 67.0011,
  address: 'Karachi',
  city: 'Karachi',
  country: 'Pakistan',
  countryCode: 'pk',
};

describe('rides store', () => {
  beforeEach(() => {
    useRidesStore.getState().resetDraft();
  });

  it('updates the ride draft pickup and destination', () => {
    useRidesStore.getState().setPickup(location);
    useRidesStore.getState().setDestination({
      ...location,
      address: 'Clifton',
    });

    expect(useRidesStore.getState().draft.pickup?.address).toBe('Karachi');
    expect(useRidesStore.getState().draft.destination?.address).toBe('Clifton');
  });

  it('stores departure time as an ISO string', () => {
    useRidesStore
      .getState()
      .setDepartureTime(new Date('2026-05-04T10:30:00.000Z'));

    expect(useRidesStore.getState().draft.departureTime).toBe(
      '2026-05-04T10:30:00.000Z',
    );
  });

  it('stores seats within the ride seat limits', () => {
    useRidesStore.getState().setSeats(3);

    expect(useRidesStore.getState().draft.seats).toBe(3);

    useRidesStore.getState().setSeats(10);

    expect(useRidesStore.getState().draft.seats).toBe(4);

    useRidesStore.getState().setSeats(null);

    expect(useRidesStore.getState().draft.seats).toBeNull();
  });

  it('clears only the destination', () => {
    useRidesStore.getState().setPickup(location);
    useRidesStore.getState().setDestination({
      ...location,
      address: 'Clifton',
    });

    useRidesStore.getState().clearDestination();

    expect(useRidesStore.getState().draft.pickup?.address).toBe('Karachi');
    expect(useRidesStore.getState().draft.destination).toBeNull();
  });
});

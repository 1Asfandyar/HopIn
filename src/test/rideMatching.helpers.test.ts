import { describe, expect, it } from '@jest/globals';
import {
  filterMatchingRides,
  getRideMatchTimeRange,
} from '@/features/rides/helpers/rideMatching.helpers';
import type { AppLocation, RideDraft, RideRecord } from '@/types/types';

const pickup: AppLocation = {
  latitude: 24.8607,
  longitude: 67.0011,
  address: 'Karachi',
  city: 'Karachi',
  country: 'Pakistan',
  countryCode: 'pk',
};

const destination: AppLocation = {
  latitude: 24.8138,
  longitude: 67.0299,
  address: 'Clifton',
  city: 'Karachi',
  country: 'Pakistan',
  countryCode: 'pk',
};

const makeRide = (overrides: Partial<RideRecord>): RideRecord => ({
  id: 'ride-1',
  userId: 'user-1',
  pickup,
  destination,
  departureTime: '2026-05-10T10:30:00.000Z',
  status: 'open',
  createdAt: '2026-05-10T08:00:00.000Z',
  ...overrides,
});

describe('ride matching helpers', () => {
  it('filters rides by route and time window', () => {
    const draft: RideDraft = {
      pickup,
      destination,
      departureTime: '2026-05-10T10:00:00.000Z',
    };
    const matchingRide = makeRide({ id: 'match' });
    const lateRide = makeRide({
      id: 'late',
      departureTime: '2026-05-10T15:00:00.000Z',
    });
    const wrongRouteRide = makeRide({
      id: 'wrong-route',
      destination: {
        ...destination,
        latitude: 25.396,
        longitude: 68.3578,
        address: 'Hyderabad',
      },
    });

    expect(
      filterMatchingRides([matchingRide, lateRide, wrongRouteRide], draft).map(
        ride => ride.id,
      ),
    ).toEqual(['match']);
  });

  it('allows route-only matching before departure time is selected', () => {
    const draft: RideDraft = {
      pickup,
      destination,
      departureTime: null,
    };

    expect(
      filterMatchingRides([makeRide({ id: 'match' })], draft),
    ).toHaveLength(1);
  });

  it('builds a two hour search window around the selected time', () => {
    expect(getRideMatchTimeRange('2026-05-10T10:00:00.000Z')).toEqual({
      start: '2026-05-10T08:00:00.000Z',
      end: '2026-05-10T12:00:00.000Z',
    });
  });
});

import {
  RIDE_MATCH_ROUTE_RADIUS_METERS,
  RIDE_MATCH_TIME_WINDOW_MINUTES,
} from '@/features/rides/constants/rideMatching.constants';
import type { AppLocation, RideDraft, RideRecord } from '@/types/types';

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const getDistanceInMeters = (
  from: Pick<AppLocation, 'latitude' | 'longitude'>,
  to: Pick<AppLocation, 'latitude' | 'longitude'>,
) => {
  const earthRadiusMeters = 6371000;
  const fromLatitude = degreesToRadians(from.latitude);
  const toLatitude = degreesToRadians(to.latitude);
  const latitudeDelta = degreesToRadians(to.latitude - from.latitude);
  const longitudeDelta = degreesToRadians(to.longitude - from.longitude);
  const haversine =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  return (
    earthRadiusMeters *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
};

const areLocationsNear = (first: AppLocation, second: AppLocation) =>
  getDistanceInMeters(first, second) <= RIDE_MATCH_ROUTE_RADIUS_METERS;

export const isRideRouteMatch = (
  ride: RideRecord,
  draft: Pick<RideDraft, 'pickup' | 'destination'>,
) => {
  if (!draft.pickup || !draft.destination) {
    return false;
  }

  return (
    areLocationsNear(ride.pickup, draft.pickup) &&
    areLocationsNear(ride.destination, draft.destination)
  );
};

export const isRideTimeMatch = (
  ride: RideRecord,
  departureTime: string | null,
) => {
  if (!departureTime) {
    return true;
  }

  const requestedTime = new Date(departureTime).getTime();
  const rideTime = new Date(ride.departureTime).getTime();
  const windowMs = RIDE_MATCH_TIME_WINDOW_MINUTES * 60 * 1000;

  return Math.abs(rideTime - requestedTime) <= windowMs;
};

export const getRideMatchTimeRange = (departureTime: string) => {
  const requestedTime = new Date(departureTime).getTime();
  const windowMs = RIDE_MATCH_TIME_WINDOW_MINUTES * 60 * 1000;

  return {
    start: new Date(requestedTime - windowMs).toISOString(),
    end: new Date(requestedTime + windowMs).toISOString(),
  };
};

export const filterMatchingRides = <TRide extends RideRecord>(
  rides: TRide[],
  draft: RideDraft,
) =>
  rides.filter(
    ride =>
      isRideRouteMatch(ride, draft) &&
      isRideTimeMatch(ride, draft.departureTime),
  );

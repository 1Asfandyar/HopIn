import {
  RIDE_BOOKING_SOURCES,
  RIDE_RECORD_STATUSES,
} from '@/features/rides/constants/rides.constants';
import type {
  MyRide,
  MyRideLifecycle,
  RideBooking,
  RideOffer,
  RideRecordStatus,
  RideRequestPost,
} from '@/types/types';

export const getRideLifecycle = (departureTime: string): MyRideLifecycle => {
  return new Date(departureTime).getTime() <= Date.now()
    ? 'completed'
    : 'upcoming';
};

export const getEffectiveRideStatus = (
  status: RideRecordStatus,
  departureTime: string,
): RideRecordStatus => {
  if (getRideLifecycle(departureTime) === 'upcoming') {
    return status === RIDE_RECORD_STATUSES.open
      ? RIDE_RECORD_STATUSES.pending
      : status;
  }

  if (status === RIDE_RECORD_STATUSES.accepted) {
    return RIDE_RECORD_STATUSES.completed;
  }

  if (
    status === RIDE_RECORD_STATUSES.open ||
    status === RIDE_RECORD_STATUSES.pending
  ) {
    return RIDE_RECORD_STATUSES.notCompleted;
  }

  return status;
};

export const mapRequestToMyRide = (
  request: RideRequestPost,
  booking?: RideBooking,
): MyRide => {
  const status = booking?.status ?? request.status;

  return {
    id: request.id,
    kind: 'request',
    role: 'rider',
    pickup: request.pickup,
    destination: request.destination,
    departureTime: request.departureTime,
    status: getEffectiveRideStatus(status, request.departureTime),
    lifecycle: getRideLifecycle(request.departureTime),
    createdAt: request.createdAt,
    bookingId: booking?.id,
    source: booking?.source,
    offerId: booking?.offerId,
    requestId: request.id,
  };
};

export const mapOfferToMyRide = (
  offer: RideOffer,
  booking?: RideBooking,
): MyRide => {
  const status = booking?.status ?? offer.status;

  return {
    id: offer.id,
    kind: 'offer',
    role: 'driver',
    pickup: offer.pickup,
    destination: offer.destination,
    departureTime: offer.departureTime,
    status: getEffectiveRideStatus(status, offer.departureTime),
    lifecycle: getRideLifecycle(offer.departureTime),
    createdAt: offer.createdAt,
    bookingId: booking?.id,
    source: booking?.source,
    offerId: offer.id,
    requestId: booking?.requestId,
  };
};

export const mapBookingToMyRide = (
  booking: RideBooking,
  currentUserId: string,
): MyRide | null => {
  const ride = booking.request ?? booking.offer;

  if (!ride) {
    return null;
  }

  return {
    id: booking.id,
    kind: 'booking',
    role: booking.driverId === currentUserId ? 'driver' : 'rider',
    pickup: ride.pickup,
    destination: ride.destination,
    departureTime: ride.departureTime,
    status: getEffectiveRideStatus(booking.status, ride.departureTime),
    lifecycle: getRideLifecycle(ride.departureTime),
    createdAt: booking.createdAt,
    bookingId: booking.id,
    source: booking.source ?? RIDE_BOOKING_SOURCES.directOffer,
    offerId: booking.offerId,
    requestId: booking.requestId,
  };
};

export const sortMyRidesByDeparture = (rides: MyRide[]) => {
  return [...rides].sort(
    (firstRide, secondRide) =>
      new Date(firstRide.departureTime).getTime() -
      new Date(secondRide.departureTime).getTime(),
  );
};

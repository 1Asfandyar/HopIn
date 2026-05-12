import { RIDE_STATUS_LABELS } from '@/features/rides/constants/rides.constants';
import { formatDateAndTime } from '@/utils/date';
import type { RideRecord, RideRecordType } from '@/types/types';

export const getRideParticipantName = (
  ride: RideRecord,
  fallback = 'Someone',
) => ride.userProfile?.fullName?.trim() || fallback;

export const getShortRideAddress = (address: string) => {
  const addressParts = address
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);

  if (addressParts.length <= 2) {
    return address.trim();
  }

  return addressParts.slice(-2).join(', ');
};

export const getRideSummaryText = (
  ride: RideRecord,
  rideType: RideRecordType,
) => {
  const name = getRideParticipantName(
    ride,
    rideType === 'offer' ? 'A driver' : 'A rider',
  );
  const verb = rideType === 'offer' ? 'is driving to' : 'is going to';
  const pickup = getShortRideAddress(ride.pickup.address);
  const destination = getShortRideAddress(ride.destination.address);

  return `${name} ${verb} ${destination} from ${pickup} at ${formatDateAndTime(
    new Date(ride.departureTime),
  )}.`;
};

export const getRideDetailActionLabel = (rideType: RideRecordType) => {
  return rideType === 'offer' ? 'Book a seat' : 'Accept rider request';
};

export const getRideSeatCount = <TRide extends object>(ride: TRide) => {
  const seats = (ride as { seats?: unknown }).seats;

  return typeof seats === 'number' ? seats : null;
};

export const formatRideSeatCount = (seats: number) => {
  return `${seats} ${seats === 1 ? 'seat' : 'seats'}`;
};

export const getRideDetailTitle = (rideType: RideRecordType) => {
  return rideType === 'offer' ? 'Ride details' : 'Request details';
};

export const getRideStatusLabel = (ride: RideRecord) => {
  return RIDE_STATUS_LABELS[ride.status];
};

import { RIDE_STATUS_LABELS } from '@/features/rides/constants/rides.constants';
import { formatDateAndTime } from '@/utils/date';
import type { RideRecord, RideRecordType } from '@/types/types';

export const getRideParticipantName = (
  ride: RideRecord,
  fallback = 'Someone',
) => ride.userProfile?.fullName?.trim() || fallback;

export const getRideSummaryText = (
  ride: RideRecord,
  rideType: RideRecordType,
) => {
  const name = getRideParticipantName(
    ride,
    rideType === 'offer' ? 'A driver' : 'A rider',
  );
  const verb = rideType === 'offer' ? 'is driving to' : 'is going to';

  return `${name} ${verb} ${ride.destination.address} from ${ride.pickup.address} at ${formatDateAndTime(
    new Date(ride.departureTime),
  )}.`;
};

export const getRideDetailActionLabel = (rideType: RideRecordType) => {
  return rideType === 'offer' ? 'Book a seat' : 'Accept rider request';
};

export const getRideDetailTitle = (rideType: RideRecordType) => {
  return rideType === 'offer' ? 'Ride details' : 'Request details';
};

export const getRideStatusLabel = (ride: RideRecord) => {
  return RIDE_STATUS_LABELS[ride.status];
};

import type {
  MyRideLifecycle,
  RideBookingSource,
  RideRecordStatus,
} from '@/types/types';

export const RIDE_RECORD_STATUSES = {
  open: 'open',
  pending: 'pending',
  accepted: 'accepted',
  cancelled: 'cancelled',
  completed: 'completed',
  notCompleted: 'not_completed',
} as const satisfies Record<string, RideRecordStatus>;

export const RIDE_BOOKING_SOURCES = {
  directOffer: 'direct_offer',
  requestAcceptance: 'request_acceptance',
} as const satisfies Record<string, RideBookingSource>;

export const MY_RIDES_TABS = {
  upcoming: 'upcoming',
  completed: 'completed',
} as const satisfies Record<string, MyRideLifecycle>;

export const RIDE_STATUS_LABELS: Record<RideRecordStatus, string> = {
  open: 'Pending',
  pending: 'Pending',
  accepted: 'Accepted',
  cancelled: 'Cancelled',
  completed: 'Completed',
  not_completed: 'Not completed',
};

export const RIDE_SOURCE_LABELS: Record<RideBookingSource, string> = {
  direct_offer: 'Joined ride',
  request_acceptance: 'Request accepted',
};

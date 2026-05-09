import type {
  AppLocation,
  MyRide,
  MyRidesSummary,
  RideBooking,
  RideBookingSource,
  RideDraft,
  RideOffer,
  RideRecordStatus,
  RideRecordType,
  RideRequest,
  RideRequestPost,
  UserProfile,
} from '@/types/types';
import type { UserRole } from '@/constants/roles';
import { USER_ROLES } from '@/constants/roles';
import {
  RIDE_BOOKING_SOURCES,
  RIDE_RECORD_STATUSES,
} from '@/features/rides/constants/rides.constants';
import {
  mapBookingToMyRide,
  mapOfferToMyRide,
  mapRequestToMyRide,
  sortMyRidesByDeparture,
} from '@/features/rides/helpers/rides.helpers';
import { profileService } from './profileService';
import { supabase } from './supabaseClient';

type RideRow = {
  id: string;
  user_id: string | null;
  pickup: AppLocation;
  destination: AppLocation;
  departure_time: string;
  status: string | null;
  created_at: string;
  seats?: number | null;
  price?: number | null;
};

type RideBookingRow = {
  id: string;
  offer_id: string | null;
  request_id: string | null;
  rider_id: string;
  driver_id: string | null;
  status: string | null;
  source: string | null;
  created_at: string;
  ride_offers?: RideRow | RideRow[] | null;
  ride_requests?: RideRow | RideRow[] | null;
};

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

const getCurrentUserId = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!data.user?.id) {
    throw new Error('Please sign in before posting or finding rides.');
  }

  return data.user.id;
};

const mapRideRow = (row: RideRow, profile?: UserProfile | null): RideOffer => ({
  id: row.id,
  userId: row.user_id,
  pickup: row.pickup,
  destination: row.destination,
  departureTime: row.departure_time,
  status: (row.status ?? RIDE_RECORD_STATUSES.open) as RideRecordStatus,
  createdAt: row.created_at,
  userProfile: profile ?? null,
  seats: row.seats ?? undefined,
  price: row.price ?? undefined,
});

const hydrateRideRowsWithProfiles = async (rows: RideRow[]) => {
  const userIds = rows
    .map(row => row.user_id)
    .filter((userId): userId is string => Boolean(userId));
  const profiles = await profileService.listProfilesByIds(userIds);
  const profilesById = new Map(profiles.map(profile => [profile.id, profile]));

  return rows.map(row =>
    mapRideRow(row, row.user_id ? profilesById.get(row.user_id) : null),
  );
};

const pickJoinedRow = (row?: RideRow | RideRow[] | null) => {
  if (Array.isArray(row)) {
    return row[0] ?? null;
  }

  return row ?? null;
};

const mapRideBookingRow = (row: RideBookingRow): RideBooking => ({
  id: row.id,
  offerId: row.offer_id,
  requestId: row.request_id,
  riderId: row.rider_id,
  driverId: row.driver_id,
  status: (row.status ??
    RIDE_RECORD_STATUSES.accepted) as RideBooking['status'],
  source: (row.source ?? RIDE_BOOKING_SOURCES.directOffer) as RideBookingSource,
  createdAt: row.created_at,
  offer: pickJoinedRow(row.ride_offers)
    ? mapRideRow(pickJoinedRow(row.ride_offers) as RideRow)
    : null,
  request: pickJoinedRow(row.ride_requests)
    ? mapRideRow(pickJoinedRow(row.ride_requests) as RideRow)
    : null,
});

const selectRideColumns =
  'id,user_id,pickup,destination,departure_time,status,created_at';
const selectRideBookingColumns = `
  id,
  offer_id,
  request_id,
  rider_id,
  driver_id,
  status,
  source,
  created_at,
  ride_offers (${selectRideColumns}),
  ride_requests (${selectRideColumns})
`;

export const ridesService = {
  createOffer: async (draft: RideDraft): Promise<RideOffer> => {
    const offer = assertCompleteDraft(draft);
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('ride_offers')
      .insert({
        user_id: userId,
        pickup: offer.pickup,
        destination: offer.destination,
        departure_time: offer.departureTime,
        status: 'open',
      })
      .select(selectRideColumns)
      .single<RideRow>();

    if (error) {
      throw error;
    }

    const [ride] = await hydrateRideRowsWithProfiles([data]);

    return ride;
  },

  createRequest: async (draft: RideDraft): Promise<RideRequestPost> => {
    const request = assertCompleteDraft(draft);
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('ride_requests')
      .insert({
        user_id: userId,
        pickup: request.pickup,
        destination: request.destination,
        departure_time: request.departureTime,
        status: 'open',
      })
      .select(selectRideColumns)
      .single<RideRow>();

    if (error) {
      throw error;
    }

    const [ride] = await hydrateRideRowsWithProfiles([data]);

    return ride;
  },

  joinOffer: async (offerId: string): Promise<RideBooking> => {
    const userId = await getCurrentUserId();
    const { data: offerData, error: offerError } = await supabase
      .from('ride_offers')
      .select(selectRideColumns)
      .eq('id', offerId)
      .single<RideRow>();

    if (offerError) {
      throw offerError;
    }

    if (!offerData.user_id) {
      throw new Error('This ride offer is missing a driver.');
    }

    if (offerData.user_id === userId) {
      throw new Error("You can't join your own ride offer.");
    }

    if (offerData.status !== RIDE_RECORD_STATUSES.open) {
      throw new Error('This ride offer is no longer available.');
    }

    const { data, error } = await supabase
      .from('ride_bookings')
      .insert({
        offer_id: offerId,
        rider_id: userId,
        driver_id: offerData.user_id,
        status: RIDE_RECORD_STATUSES.accepted,
        source: RIDE_BOOKING_SOURCES.directOffer,
      })
      .select(selectRideBookingColumns)
      .single<RideBookingRow>();

    if (error) {
      throw error;
    }

    await supabase
      .from('ride_offers')
      .update({ status: RIDE_RECORD_STATUSES.accepted })
      .eq('id', offerId)
      .eq('status', RIDE_RECORD_STATUSES.open);

    return mapRideBookingRow(data);
  },

  acceptRequest: async (
    requestId: string,
    offerId?: string,
  ): Promise<RideBooking> => {
    const userId = await getCurrentUserId();
    const { data: requestData, error: requestError } = await supabase
      .from('ride_requests')
      .select(selectRideColumns)
      .eq('id', requestId)
      .single<RideRow>();

    if (requestError) {
      throw requestError;
    }

    if (!requestData.user_id) {
      throw new Error('This ride request is missing a rider.');
    }

    if (requestData.user_id === userId) {
      throw new Error("You can't accept your own ride request.");
    }

    if (requestData.status !== RIDE_RECORD_STATUSES.open) {
      throw new Error('This ride request is no longer available.');
    }

    const { data, error } = await supabase
      .from('ride_bookings')
      .insert({
        offer_id: offerId,
        request_id: requestId,
        rider_id: requestData.user_id,
        driver_id: userId,
        status: RIDE_RECORD_STATUSES.accepted,
        source: RIDE_BOOKING_SOURCES.requestAcceptance,
      })
      .select(selectRideBookingColumns)
      .single<RideBookingRow>();

    if (error) {
      throw error;
    }

    await supabase
      .from('ride_requests')
      .update({ status: RIDE_RECORD_STATUSES.accepted })
      .eq('id', requestId)
      .eq('status', RIDE_RECORD_STATUSES.open);

    if (offerId) {
      await supabase
        .from('ride_offers')
        .update({ status: RIDE_RECORD_STATUSES.accepted })
        .eq('id', offerId)
        .eq('status', RIDE_RECORD_STATUSES.open);
    }

    return mapRideBookingRow(data);
  },

  search: async (draft: RideDraft): Promise<RideOffer[]> => {
    assertCompleteDraft(draft);

    const { data, error } = await supabase
      .from('ride_offers')
      .select(selectRideColumns)
      .eq('status', 'open')
      .gte('departure_time', new Date().toISOString())
      .order('departure_time', { ascending: true });

    if (error) {
      throw error;
    }

    return hydrateRideRowsWithProfiles((data ?? []) as RideRow[]);
  },

  listOpenRequests: async (): Promise<RideRequestPost[]> => {
    const { data, error } = await supabase
      .from('ride_requests')
      .select(selectRideColumns)
      .eq('status', 'open')
      .gte('departure_time', new Date().toISOString())
      .order('departure_time', { ascending: true });

    if (error) {
      throw error;
    }

    return hydrateRideRowsWithProfiles((data ?? []) as RideRow[]);
  },

  getRideById: async (
    rideType: RideRecordType,
    rideId: string,
  ): Promise<RideOffer | RideRequestPost> => {
    const { data, error } = await supabase
      .from(rideType === 'offer' ? 'ride_offers' : 'ride_requests')
      .select(selectRideColumns)
      .eq('id', rideId)
      .single<RideRow>();

    if (error) {
      throw error;
    }

    const [ride] = await hydrateRideRowsWithProfiles([data]);

    return ride;
  },

  listMyRides: async (role: UserRole): Promise<MyRidesSummary> => {
    const userId = await getCurrentUserId();
    const isDriver = role === USER_ROLES.driver;
    const [postedRidesResult, bookingsResult] = await Promise.all([
      isDriver
        ? supabase
            .from('ride_offers')
            .select(selectRideColumns)
            .eq('user_id', userId)
            .order('departure_time', { ascending: true })
        : supabase
            .from('ride_requests')
            .select(selectRideColumns)
            .eq('user_id', userId)
            .order('departure_time', { ascending: true }),
      supabase
        .from('ride_bookings')
        .select(selectRideBookingColumns)
        .eq(isDriver ? 'driver_id' : 'rider_id', userId)
        .order('created_at', { ascending: false }),
    ]);

    if (postedRidesResult.error) {
      throw postedRidesResult.error;
    }

    if (bookingsResult.error) {
      throw bookingsResult.error;
    }

    const bookings = (bookingsResult.data ?? []).map(row =>
      mapRideBookingRow(row as RideBookingRow),
    );
    const bookingsByPostedRideId = new Map<string, RideBooking>();
    bookings.forEach(booking => {
      const postedRideId = isDriver ? booking.offerId : booking.requestId;

      if (postedRideId) {
        bookingsByPostedRideId.set(postedRideId, booking);
      }
    });
    const postedRides = (postedRidesResult.data ?? []).map(row => {
      const ride = mapRideRow(row as RideRow);
      const booking = bookingsByPostedRideId.get(ride.id);

      return isDriver
        ? mapOfferToMyRide(ride, booking)
        : mapRequestToMyRide(ride, booking);
    });
    const postedRideIds = new Set(
      postedRides
        .map(ride => (isDriver ? ride.offerId : ride.requestId))
        .filter(Boolean),
    );
    const bookingRides = bookings
      .filter(booking => {
        const postedRideId = isDriver ? booking.offerId : booking.requestId;

        return !postedRideId || !postedRideIds.has(postedRideId);
      })
      .map(booking => mapBookingToMyRide(booking, userId))
      .filter(ride => ride !== null);
    const rides = [...postedRides, ...bookingRides];

    return {
      upcoming: sortMyRidesByDeparture(
        rides.filter(ride => ride.lifecycle === 'upcoming'),
      ),
      completed: sortMyRidesByDeparture(
        rides.filter(ride => ride.lifecycle === 'completed'),
      ).reverse(),
    };
  },

  deleteMyRide: async (ride: MyRide): Promise<void> => {
    await getCurrentUserId();
    const shouldReopenRide = ride.lifecycle === 'upcoming';

    if (ride.kind === 'offer') {
      const offerId = ride.offerId ?? ride.id;
      const { error: bookingDeleteError } = await supabase
        .from('ride_bookings')
        .delete()
        .eq('offer_id', offerId);

      if (bookingDeleteError) {
        throw bookingDeleteError;
      }

      const { error } = await supabase
        .from('ride_offers')
        .delete()
        .eq('id', offerId);

      if (error) {
        throw error;
      }

      return;
    }

    if (ride.kind === 'request') {
      const requestId = ride.requestId ?? ride.id;
      const { error: bookingDeleteError } = await supabase
        .from('ride_bookings')
        .delete()
        .eq('request_id', requestId);

      if (bookingDeleteError) {
        throw bookingDeleteError;
      }

      const { error } = await supabase
        .from('ride_requests')
        .delete()
        .eq('id', requestId);

      if (error) {
        throw error;
      }

      return;
    }

    if (!ride.bookingId) {
      throw new Error('This ride cannot be deleted right now.');
    }

    if (shouldReopenRide && ride.offerId) {
      const { error } = await supabase
        .from('ride_offers')
        .update({ status: RIDE_RECORD_STATUSES.open })
        .eq('id', ride.offerId)
        .eq('status', RIDE_RECORD_STATUSES.accepted);

      if (error) {
        throw error;
      }
    }

    if (shouldReopenRide && ride.requestId) {
      const { error } = await supabase
        .from('ride_requests')
        .update({ status: RIDE_RECORD_STATUSES.open })
        .eq('id', ride.requestId)
        .eq('status', RIDE_RECORD_STATUSES.accepted);

      if (error) {
        throw error;
      }
    }

    const { error } = await supabase
      .from('ride_bookings')
      .delete()
      .eq('id', ride.bookingId);

    if (error) {
      throw error;
    }
  },
};

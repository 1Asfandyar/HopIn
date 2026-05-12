import type {
  AppLocation,
  MyRide,
  MyRidesSummary,
  RideBooking,
  RideBookingSource,
  RideDraft,
  RideOffer,
  RideRecord,
  RideRecordStatus,
  RideRecordType,
  RideRequest,
  RideRequestPost,
  RideRouteDraft,
  UserProfile,
} from '@/types/types';
import type { UserRole } from '@/constants/roles';
import { USER_ROLES } from '@/constants/roles';
import {
  RIDE_BOOKING_SOURCES,
  RIDE_RECORD_STATUSES,
  RIDE_SEAT_LIMITS,
} from '@/features/rides/constants/rides.constants';
import {
  mapBookingToMyRide,
  mapOfferToMyRide,
  mapRequestToMyRide,
  sortMyRidesByDeparture,
} from '@/features/rides/helpers/rides.helpers';
import {
  filterMatchingRides,
  getRideMatchTimeRange,
} from '@/features/rides/helpers/rideMatching.helpers';
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

type RideOfferPayload = RideRequest & {
  seats: number;
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

const assertCompleteOfferDraft = (draft: RideDraft): RideOfferPayload => {
  const offer = assertCompleteDraft(draft);
  const seats = draft.seats;

  if (
    typeof seats !== 'number' ||
    !Number.isInteger(seats) ||
    seats < RIDE_SEAT_LIMITS.min ||
    seats > RIDE_SEAT_LIMITS.max
  ) {
    throw new Error(
      `Please choose between ${RIDE_SEAT_LIMITS.min} and ${RIDE_SEAT_LIMITS.max} seats.`,
    );
  }

  return {
    ...offer,
    seats,
  };
};

const assertRouteDraft = (draft: RideDraft): RideRouteDraft => {
  if (!draft.pickup || !draft.destination) {
    throw new Error('Pickup and destination are required.');
  }

  return {
    pickup: draft.pickup,
    destination: draft.destination,
  };
};

const getDepartureStart = (draft: RideDraft) => {
  if (!draft.departureTime) {
    return new Date().toISOString();
  }

  const range = getRideMatchTimeRange(draft.departureTime);

  return new Date(
    Math.max(new Date(range.start).getTime(), Date.now()),
  ).toISOString();
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

const mapBaseRideRow = (
  row: RideRow,
  profile?: UserProfile | null,
): RideRecord => ({
  id: row.id,
  userId: row.user_id,
  pickup: row.pickup,
  destination: row.destination,
  departureTime: row.departure_time,
  status: (row.status ?? RIDE_RECORD_STATUSES.open) as RideRecordStatus,
  createdAt: row.created_at,
  userProfile: profile ?? null,
});

const mapOfferRow = (
  row: RideRow,
  profile?: UserProfile | null,
): RideOffer => ({
  ...mapBaseRideRow(row, profile),
  seats: row.seats ?? RIDE_SEAT_LIMITS.min,
  price: row.price ?? undefined,
});

const mapRequestRow = (
  row: RideRow,
  profile?: UserProfile | null,
): RideRequestPost => mapBaseRideRow(row, profile);

const getProfilesByUserId = async (rows: RideRow[]) => {
  const userIds = rows
    .map(row => row.user_id)
    .filter((userId): userId is string => Boolean(userId));
  const profiles = await profileService.listProfilesByIds(userIds);

  return new Map(profiles.map(profile => [profile.id, profile]));
};

const hydrateOfferRowsWithProfiles = async (rows: RideRow[]) => {
  const profilesById = await getProfilesByUserId(rows);

  return rows.map(row =>
    mapOfferRow(row, row.user_id ? profilesById.get(row.user_id) : null),
  );
};

const hydrateRequestRowsWithProfiles = async (rows: RideRow[]) => {
  const profilesById = await getProfilesByUserId(rows);

  return rows.map(row =>
    mapRequestRow(row, row.user_id ? profilesById.get(row.user_id) : null),
  );
};

const pickJoinedRow = (row?: RideRow | RideRow[] | null) => {
  if (Array.isArray(row)) {
    return row[0] ?? null;
  }

  return row ?? null;
};

const mapRideBookingRow = (row: RideBookingRow): RideBooking => {
  const offerRow = pickJoinedRow(row.ride_offers);
  const requestRow = pickJoinedRow(row.ride_requests);

  return {
    id: row.id,
    offerId: row.offer_id,
    requestId: row.request_id,
    riderId: row.rider_id,
    driverId: row.driver_id,
    status: (row.status ??
      RIDE_RECORD_STATUSES.accepted) as RideBooking['status'],
    source: (row.source ??
      RIDE_BOOKING_SOURCES.directOffer) as RideBookingSource,
    createdAt: row.created_at,
    offer: offerRow ? mapOfferRow(offerRow) : null,
    request: requestRow ? mapRequestRow(requestRow) : null,
  };
};

const selectBaseRideColumns =
  'id,user_id,pickup,destination,departure_time,status,created_at';
const selectOfferColumns = `${selectBaseRideColumns},seats`;
const selectRequestColumns = selectBaseRideColumns;
const selectRideBookingColumns = `
  id,
  offer_id,
  request_id,
  rider_id,
  driver_id,
  status,
  source,
  created_at,
  ride_offers (${selectOfferColumns}),
  ride_requests (${selectRequestColumns})
`;

export const ridesService = {
  createOffer: async (draft: RideDraft): Promise<RideOffer> => {
    const offer = assertCompleteOfferDraft(draft);
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('ride_offers')
      .insert({
        user_id: userId,
        pickup: offer.pickup,
        destination: offer.destination,
        departure_time: offer.departureTime,
        seats: offer.seats,
        status: 'open',
      })
      .select(selectOfferColumns)
      .single<RideRow>();

    if (error) {
      throw error;
    }

    const [ride] = await hydrateOfferRowsWithProfiles([data]);

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
      .select(selectRequestColumns)
      .single<RideRow>();

    if (error) {
      throw error;
    }

    const [ride] = await hydrateRequestRowsWithProfiles([data]);

    return ride;
  },

  joinOffer: async (offerId: string): Promise<RideBooking> => {
    const userId = await getCurrentUserId();
    const { data: offerData, error: offerError } = await supabase
      .from('ride_offers')
      .select(selectOfferColumns)
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

    const { data: existingBooking, error: existingBookingError } =
      await supabase
        .from('ride_bookings')
        .select('id')
        .eq('offer_id', offerId)
        .eq('rider_id', userId)
        .maybeSingle<{ id: string }>();

    if (existingBookingError) {
      throw existingBookingError;
    }

    if (existingBooking) {
      throw new Error("You've already booked a seat on this ride.");
    }

    const { count: acceptedBookingCount, error: bookingCountError } =
      await supabase
        .from('ride_bookings')
        .select('id', { count: 'exact', head: true })
        .eq('offer_id', offerId)
        .eq('status', RIDE_RECORD_STATUSES.accepted);

    if (bookingCountError) {
      throw bookingCountError;
    }

    const bookedSeats = acceptedBookingCount ?? 0;
    const offeredSeats = offerData.seats ?? RIDE_SEAT_LIMITS.min;

    if (bookedSeats >= offeredSeats) {
      throw new Error('This ride is fully booked.');
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

    if (bookedSeats + 1 >= offeredSeats) {
      await supabase
        .from('ride_offers')
        .update({ status: RIDE_RECORD_STATUSES.accepted })
        .eq('id', offerId)
        .eq('status', RIDE_RECORD_STATUSES.open);
    }

    return mapRideBookingRow(data);
  },

  acceptRequest: async (
    requestId: string,
    offerId?: string,
  ): Promise<RideBooking> => {
    const userId = await getCurrentUserId();
    const { data: requestData, error: requestError } = await supabase
      .from('ride_requests')
      .select(selectRequestColumns)
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
    assertRouteDraft(draft);
    const range = draft.departureTime
      ? getRideMatchTimeRange(draft.departureTime)
      : null;
    let query = supabase
      .from('ride_offers')
      .select(selectOfferColumns)
      .eq('status', 'open')
      .gte('departure_time', getDepartureStart(draft));

    if (range) {
      query = query.lte('departure_time', range.end);
    }

    const { data, error } = await query.order('departure_time', {
      ascending: true,
    });

    if (error) {
      throw error;
    }

    const rides = await hydrateOfferRowsWithProfiles((data ?? []) as RideRow[]);

    return filterMatchingRides(rides, draft);
  },

  listOpenRequests: async (): Promise<RideRequestPost[]> => {
    const { data, error } = await supabase
      .from('ride_requests')
      .select(selectRequestColumns)
      .eq('status', 'open')
      .gte('departure_time', new Date().toISOString())
      .order('departure_time', { ascending: true });

    if (error) {
      throw error;
    }

    return hydrateRequestRowsWithProfiles((data ?? []) as RideRow[]);
  },

  searchRequests: async (draft: RideDraft): Promise<RideRequestPost[]> => {
    assertRouteDraft(draft);
    const range = draft.departureTime
      ? getRideMatchTimeRange(draft.departureTime)
      : null;
    let query = supabase
      .from('ride_requests')
      .select(selectRequestColumns)
      .eq('status', 'open')
      .gte('departure_time', getDepartureStart(draft));

    if (range) {
      query = query.lte('departure_time', range.end);
    }

    const { data, error } = await query.order('departure_time', {
      ascending: true,
    });

    if (error) {
      throw error;
    }

    const rides = await hydrateRequestRowsWithProfiles(
      (data ?? []) as RideRow[],
    );

    return filterMatchingRides(rides, draft);
  },

  getRideById: async (
    rideType: RideRecordType,
    rideId: string,
  ): Promise<RideOffer | RideRequestPost> => {
    const tableName = rideType === 'offer' ? 'ride_offers' : 'ride_requests';
    const columns =
      rideType === 'offer' ? selectOfferColumns : selectRequestColumns;
    const { data, error } = await supabase
      .from(tableName)
      .select(columns)
      .eq('id', rideId)
      .single<RideRow>();

    if (error) {
      throw error;
    }

    const [ride] =
      rideType === 'offer'
        ? await hydrateOfferRowsWithProfiles([data])
        : await hydrateRequestRowsWithProfiles([data]);

    return ride;
  },

  listMyRides: async (role: UserRole): Promise<MyRidesSummary> => {
    const userId = await getCurrentUserId();
    const isDriver = role === USER_ROLES.driver;
    const [postedRidesResult, bookingsResult] = await Promise.all([
      isDriver
        ? supabase
            .from('ride_offers')
            .select(selectOfferColumns)
            .eq('user_id', userId)
            .order('departure_time', { ascending: true })
        : supabase
            .from('ride_requests')
            .select(selectRequestColumns)
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
      const rideRow = row as RideRow;

      if (isDriver) {
        const offer = mapOfferRow(rideRow);
        const booking = bookingsByPostedRideId.get(offer.id);

        return mapOfferToMyRide(offer, booking);
      }

      const request = mapRequestRow(rideRow);
      const booking = bookingsByPostedRideId.get(request.id);

      return mapRequestToMyRide(request, booking);
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

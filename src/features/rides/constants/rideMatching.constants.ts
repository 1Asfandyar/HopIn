import type { RideFlowMode } from '@/types/types';

export const RIDE_MATCH_ROUTE_RADIUS_METERS = 5000;
export const RIDE_MATCH_TIME_WINDOW_MINUTES = 120;

export const RIDE_MATCHING_COPY = {
  find: {
    mapDoneLabel: 'Done',
    resultsTitle: 'Available drivers',
    resultsSubtitle: 'Drivers going your way appear here.',
    emptyTitle: 'No drivers found',
    emptyDescription: 'Post your request so nearby drivers can respond.',
    postLabel: 'Post request',
    postingLabel: 'Posting request...',
    disabledPostLabel: 'Set time to post request',
    successTitle: 'Request posted',
    successMessage: "We'll notify you when a driver posts a matching ride.",
    loadingLabel: 'Loading drivers...',
    itemLabel: 'driver',
  },
  offer: {
    mapDoneLabel: 'Done',
    resultsTitle: 'Rider requests',
    resultsSubtitle: 'Riders requesting this route appear here.',
    emptyTitle: 'No rider requests found',
    emptyDescription: 'Post your ride so riders going your way can find it.',
    postLabel: 'Post ride',
    postingLabel: 'Posting ride...',
    disabledPostLabel: 'Set time to post ride',
    successTitle: 'Ride posted',
    successMessage: 'Your ride is live. Riders can now find and book a seat.',
    loadingLabel: 'Loading requests...',
    itemLabel: 'request',
  },
} as const satisfies Record<
  RideFlowMode,
  {
    mapDoneLabel: string;
    resultsTitle: string;
    resultsSubtitle: string;
    emptyTitle: string;
    emptyDescription: string;
    postLabel: string;
    postingLabel: string;
    disabledPostLabel: string;
    successTitle: string;
    successMessage: string;
    loadingLabel: string;
    itemLabel: string;
  }
>;

import type { RideFlowMode, RideRecord, RideRecordType } from '@/types/types';

export type RideSearchResultsScreenProps = {
  flowMode: RideFlowMode;
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyDescription: string;
  loadingLabel: string;
  itemLabel: string;
  rides: RideRecord[];
  rideType: RideRecordType;
  isLoading: boolean;
  errorMessage: string | null;
  hasDepartureTime: boolean;
  dateTime: Date | null;
  isDateTimePickerOpen: boolean;
  minDateTime: Date;
  formatDateAndTime: (date: Date | null) => string;
  isPosting: boolean;
  postLabel: string;
  postingLabel: string;
  disabledPostLabel: string;
  onOpenDateTimePicker: () => void;
  onCloseDateTimePicker: () => void;
  onDateTimeConfirm: (selectedDateTime: Date) => void;
  onPost: () => void;
  onRidePress: (ride: RideRecord) => void;
};

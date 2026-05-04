import { useState } from 'react';
import { useRideDraft } from './useRideDraft';
import { formatDateAndTime, isFutureDateTime } from '@/utils/date';
import { showFeedback } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';

export const useRideDateTime = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { departureTime, setDepartureTime } = useRideDraft();
  const dateTime = departureTime ? new Date(departureTime) : null;

  const openDateTimePicker = () => {
    setIsPickerOpen(true);
  };

  const closeDateTimePicker = () => {
    setIsPickerOpen(false);
  };

  const handleDateTimeConfirm = (selectedDateTime: Date) => {
    if (!isFutureDateTime(selectedDateTime)) {
      showFeedback('Invalid date', FEEDBACK_MESSAGES.invalidRideDate);
      return;
    }

    setDepartureTime(selectedDateTime);
    setIsPickerOpen(false);
  };

  return {
    dateTime,
    formatDateAndTime,
    formateDateAndTime: formatDateAndTime,
    openDateTimePicker,
    closeDateTimePicker,
    handleDateTimeConfirm,
    isOpen: isPickerOpen,
    minDateTime: new Date(),
  };
};

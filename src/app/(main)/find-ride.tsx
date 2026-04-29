import FindRideScreen from '@/features/main/find-ride/screens/FindRideScreen';
import { useDateTimePicker } from '@/hooks/useDatePicker';

const FindRide = () => {
  const {
    dateTime,
    setDateTime,
    formateDateAndTime,
    openDateTimePicker,
    closeDateTimePicker,
    handleDateTimeConfirm,
    isOpen,
    minDateTime,
  } = useDateTimePicker();

  return (
    <FindRideScreen
      dateTime={dateTime}
      setDateTime={setDateTime}
      formateDateAndTime={formateDateAndTime}
      openDateTimePicker={openDateTimePicker}
      closeDateTimePicker={closeDateTimePicker}
      handleDateTimeConfirm={handleDateTimeConfirm}
      isOpen={isOpen}
      minDateTime={minDateTime}
    />
  );
};

export default FindRide;

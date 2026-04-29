import OfferRideScreen from '@/features/main/offer-ride/screens/OfferRideScreen';
import { useDateTimePicker } from '@/hooks/useDatePicker';

const OfferRide = () => {
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
    <OfferRideScreen
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

export default OfferRide;

import LocationSelector from "@/components/LocationSelector";
import { RideProps } from "../../types";

const FindRideScreen = ({
    dateTime,
    setDateTime,
    formateDateAndTime,
    openDateTimePicker,
    closeDateTimePicker,
    handleDateTimeConfirm,
    isOpen,
    minDateTime
  }: RideProps
  )  => {
  return (
    <LocationSelector
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

export default FindRideScreen;

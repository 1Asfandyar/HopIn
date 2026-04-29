export interface RideProps {
  dateTime: Date | null;
  setDateTime: (dateTime: Date | null) => void;
  formateDateAndTime: (dateTime: Date | null) => string;
  openDateTimePicker: () => void;
  closeDateTimePicker: () => void;
  handleDateTimeConfirm: (dateTime: Date) => void;
  isOpen: boolean;
  minDateTime: Date;
}

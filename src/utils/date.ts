export const formatDateAndTime = (selectedDateTime: Date | null) => {
  if (!selectedDateTime) {
    return '';
  }

  return selectedDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const isFutureDateTime = (dateTime: Date) => dateTime >= new Date();

import { View } from 'react-native';
import { RIDE_STATUS_LABELS } from '@/features/rides/constants/rides.constants';
import { themeColors } from '@/theme/tokens';
import ThemedText from '@/theme/components/ThemedText';
import type { RideRecordStatus } from '@/types/types';

type RideStatusPillProps = {
  status: RideRecordStatus;
};

const getStatusClasses = (status: RideRecordStatus) => {
  if (status === 'accepted' || status === 'completed') {
    return {
      container: 'bg-green-50 border-green-200',
      textColor: themeColors.primary,
    };
  }

  if (status === 'not_completed' || status === 'cancelled') {
    return {
      container: 'bg-gray-100 border-gray-200',
      textColor: themeColors.gray600,
    };
  }

  return {
    container: 'bg-blue-50 border-blue-100',
    textColor: themeColors.secondary,
  };
};

const RideStatusPill = ({ status }: RideStatusPillProps) => {
  const statusClasses = getStatusClasses(status);

  return (
    <View
      className={`self-start rounded-full border px-3 py-1 ${statusClasses.container}`}
    >
      <ThemedText
        size="xs"
        weight="semiBold"
        style={{ color: statusClasses.textColor }}
      >
        {RIDE_STATUS_LABELS[status]}
      </ThemedText>
    </View>
  );
};

export default RideStatusPill;

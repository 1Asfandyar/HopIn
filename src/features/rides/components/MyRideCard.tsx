import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { RIDE_SOURCE_LABELS } from '@/features/rides/constants/rides.constants';
import RideStatusPill from '@/features/rides/components/RideStatusPill';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import { formatDateAndTime } from '@/utils/date';
import type { MyRide } from '@/types/types';

type MyRideCardProps = {
  ride: MyRide;
  isDeleting?: boolean;
  onDelete?: (ride: MyRide) => void;
};

const MyRideCard = ({
  ride,
  isDeleting = false,
  onDelete,
}: MyRideCardProps) => {
  const sourceLabel = ride.source
    ? RIDE_SOURCE_LABELS[ride.source]
    : 'Posted request';
  const roleLabel = ride.role === 'driver' ? 'Driving' : 'Riding';

  return (
    <ThemedCard
      heading={ride.destination.address}
      subHeading={formatDateAndTime(new Date(ride.departureTime))}
      variant="outline"
      leftIcon={ride.role === 'driver' ? 'car-sport-outline' : 'person-outline'}
      headingSize="md"
      containerClassName="min-h-0"
      middleElement={
        <View className="my-3 gap-3">
          <View className="flex-row flex-wrap items-center gap-2">
            <RideStatusPill status={ride.status} />
            <View className="flex-row items-center rounded-full bg-gray-100 px-3 py-1">
              <Ionicons
                name="navigate-outline"
                size={13}
                color={themeColors.gray600}
              />
              <ThemedText
                size="xs"
                weight="semiBold"
                className="ml-1 text-gray-600"
              >
                {roleLabel}
              </ThemedText>
            </View>
            {onDelete && (
              <TouchableOpacity
                activeOpacity={0.75}
                disabled={isDeleting}
                className="ml-auto h-9 w-9 items-center justify-center rounded-full bg-gray-50"
                onPress={() => onDelete(ride)}
              >
                <Ionicons
                  name={isDeleting ? 'hourglass-outline' : 'trash-outline'}
                  size={18}
                  color={isDeleting ? themeColors.gray400 : '#DC2626'}
                />
              </TouchableOpacity>
            )}
          </View>

          <View className="gap-1">
            <ThemedText size="sm" className="text-gray-600">
              From: {ride.pickup.address}
            </ThemedText>
            <ThemedText size="sm" className="text-gray-600">
              {sourceLabel}
            </ThemedText>
          </View>
        </View>
      }
    />
  );
};

export default MyRideCard;

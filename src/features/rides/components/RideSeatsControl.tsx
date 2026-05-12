import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { RIDE_SEAT_LIMITS } from '@/features/rides/constants/rides.constants';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';

type RideSeatsControlProps = {
  value: number | null | undefined;
  editable?: boolean;
  label?: string;
  helperText?: string;
  color?: string;
  onChange?: (seats: number) => void;
};

const getSeatLabel = (seats: number | null | undefined) =>
  seats === 1 ? 'seat' : 'seats';

const RideSeatsControl = ({
  value,
  editable = false,
  label = 'Seats',
  helperText,
  color = themeColors.primary,
  onChange,
}: RideSeatsControlProps) => {
  const selectedSeats = value ?? null;
  const canDecrement =
    editable && selectedSeats !== null && selectedSeats > RIDE_SEAT_LIMITS.min;
  const canIncrement =
    editable &&
    (selectedSeats === null || selectedSeats < RIDE_SEAT_LIMITS.max);
  const valueColorClassName = selectedSeats ? 'text-gray-900' : 'text-gray-400';

  const handleDecrement = () => {
    if (!canDecrement || selectedSeats === null) {
      return;
    }

    onChange?.(selectedSeats - 1);
  };

  const handleIncrement = () => {
    if (!canIncrement) {
      return;
    }

    onChange?.(
      selectedSeats === null ? RIDE_SEAT_LIMITS.min : selectedSeats + 1,
    );
  };

  if (!editable) {
    return (
      <View className="min-h-14 flex-row items-center justify-between rounded-[14px] border border-gray-200 bg-white px-3 py-2.5">
        <View className="min-w-0 flex-1 flex-row items-center gap-2 pr-3">
          <ThemedText weight="semiBold" size="sm" className="text-gray-900">
            {label}
          </ThemedText>
        </View>
                  <ThemedText weight="bold" size="lg" className={valueColorClassName}>
            {selectedSeats ?? '-'}
          </ThemedText>
      </View>
    );
  }

  return (
    <View className="min-h-[72px] flex-row items-center justify-between rounded-[14px] border border-gray-200 bg-gray-100 px-3 py-2.5">
      <View className="min-w-0 flex-1 pr-3">
        <ThemedText weight="semiBold" size="sm" className="text-gray-900">
          {label}
        </ThemedText>
        <ThemedText size="xs" className="mt-1 text-gray-500">
          {helperText ??
            (selectedSeats
              ? `${selectedSeats} ${getSeatLabel(selectedSeats)}`
              : 'Required')}
        </ThemedText>
      </View>

      <View className="min-w-[132px] flex-row items-center justify-end">
        <Pressable
          accessibilityLabel="Decrease seats"
          accessibilityRole="button"
          disabled={!canDecrement}
          hitSlop={8}
          onPress={handleDecrement}
          className={`h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white ${
            canDecrement ? 'opacity-100' : 'opacity-[0.45]'
          }`}
        >
          <Ionicons
            name="remove"
            size={18}
            color={canDecrement ? color : themeColors.gray400}
          />
        </Pressable>

        <View className="min-w-[52px] items-center">
          <ThemedText weight="bold" size="lg" className={valueColorClassName}>
            {selectedSeats ?? '-'}
          </ThemedText>
          <ThemedText size="xs" className="text-gray-500">
            {getSeatLabel(selectedSeats)}
          </ThemedText>
        </View>

        <Pressable
          accessibilityLabel="Increase seats"
          accessibilityRole="button"
          disabled={!canIncrement}
          hitSlop={8}
          onPress={handleIncrement}
          className={`h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white ${
            canIncrement ? 'opacity-100' : 'opacity-[0.45]'
          }`}
        >
          <Ionicons
            name="add"
            size={18}
            color={canIncrement ? color : themeColors.gray400}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default RideSeatsControl;

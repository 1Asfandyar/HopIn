import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { ActiveLocationInput } from '../types';
import { locationSelectorStyles as styles } from './LocationSelector.styles';

type RouteLocationCardProps = {
  input: ActiveLocationInput;
  label: string;
  address?: string;
  placeholder: string;
  hasLocation: boolean;
  routeCardClassName: string;
  routeLabelClassName: string;
  routePlaceholderClassName: string;
  onOpenLocationMap: (input: ActiveLocationInput) => void;
  onSaveLocationPress: (input: ActiveLocationInput) => void;
};

const RouteLocationCard = ({
  input,
  label,
  address,
  placeholder,
  hasLocation,
  routeCardClassName,
  routeLabelClassName,
  routePlaceholderClassName,
  onOpenLocationMap,
  onSaveLocationPress,
}: RouteLocationCardProps) => {
  const isSaveDisabled = !hasLocation;

  return (
    <View className={`rounded-2xl px-3 py-3 ${routeCardClassName}`}>
      <View className="flex-row items-start justify-between">
        <TouchableOpacity
          activeOpacity={0.75}
          className="min-w-0 flex-1 pr-2"
          onPress={() => onOpenLocationMap(input)}
        >
          <ThemedText
            weight="semiBold"
            className={`mb-1 text-[12px] uppercase tracking-wide ${routeLabelClassName}`}
          >
            {label}
          </ThemedText>
          <ThemedText
            className={`text-sm ${address ? 'text-gray-900' : routePlaceholderClassName}`}
            numberOfLines={2}
          >
            {address ?? placeholder}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          disabled={isSaveDisabled}
          className={`ml-3 flex-row items-center rounded-full border px-3 py-2 ${
            isSaveDisabled
              ? 'border-gray-200 bg-gray-50'
              : 'border-gray-200 bg-white'
          }`}
          style={styles.saveLocationAction}
          onPress={event => {
            event.stopPropagation();
            onSaveLocationPress(input);
          }}
        >
          <Ionicons
            name="bookmark-outline"
            size={14}
            color={isSaveDisabled ? themeColors.gray300 : themeColors.gray600}
          />
          <ThemedText
            weight="semiBold"
            size="xs"
            className={`ml-1 ${
              isSaveDisabled ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Save
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RouteLocationCard;

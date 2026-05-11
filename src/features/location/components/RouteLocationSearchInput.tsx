import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import { LOCATION_SELECTOR_COPY } from '../constants/location.constants';
import type { ActiveLocationInput } from '../types';
import { mapLocationPickerStyles as styles } from './MapLocationPicker.styles';

type InputCopy = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  placeholder: string;
};

type RouteLocationSearchInputProps = {
  input: ActiveLocationInput;
  value: string;
  isActive: boolean;
  isSearching: boolean;
  modeColor: string;
  disabled?: boolean;
  onChangeText: (text: string) => void;
  onClear: (input: ActiveLocationInput) => void;
  onFocus: (input: ActiveLocationInput) => void;
};

const inputCopy: Record<ActiveLocationInput, InputCopy> = {
  pickup: {
    icon: 'locate',
    label: LOCATION_SELECTOR_COPY.fromLabel,
    placeholder: LOCATION_SELECTOR_COPY.pickupPlaceholder,
  },
  destination: {
    icon: 'location',
    label: LOCATION_SELECTOR_COPY.toLabel,
    placeholder: LOCATION_SELECTOR_COPY.destinationPlaceholder,
  },
};

const RouteLocationSearchInput = ({
  input,
  value,
  isActive,
  isSearching,
  modeColor,
  disabled = false,
  onChangeText,
  onClear,
  onFocus,
}: RouteLocationSearchInputProps) => {
  const copy = inputCopy[input];
  const activeInputStyle = isActive ? { borderColor: modeColor } : null;
  const canClear = Boolean(value) && !disabled;

  return (
    <View
      style={[
        styles.routeInput,
        activeInputStyle,
        disabled ? styles.disabledRouteInput : null,
      ]}
    >
      <Ionicons name={copy.icon} size={18} color={themeColors.gray400} />
      <View style={styles.routeInputTextWrap}>
        <ThemedText weight="semiBold" className="text-[11px] text-gray-500">
          {copy.label}
        </ThemedText>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          onFocus={() => onFocus(input)}
          placeholder={copy.placeholder}
          placeholderTextColor={themeColors.gray400}
          style={styles.routeTextInput}
        />
      </View>
      {isSearching && (
        <ActivityIndicator size="small" color={themeColors.gray400} />
      )}
      {canClear && !isSearching && (
        <TouchableOpacity
          activeOpacity={0.75}
          hitSlop={10}
          style={styles.clearInputButton}
          onPress={() => onClear(input)}
        >
          <Ionicons name="close-circle" size={18} color={themeColors.gray400} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RouteLocationSearchInput;

import { memo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/theme/components/ThemedText';
import { fontFamilies, themeColors } from '@/theme/tokens';
import type { LocationInputProps } from '@/types/types';

const LocationInput = ({
  label,
  placeholder = 'Search location...',
  value,
  onChangeText,
  onFocus,
  leftIcon,
  containerClassName = '',
  isSearching = false,
  rightButtonLabel,
  onRightButtonPress,
}: LocationInputProps) => {
  return (
    <View className={`mb-2 ${containerClassName}`}>
      {label && (
        <ThemedText size="sm" className="text-gray-600 mb-1">
          {label}
        </ThemedText>
      )}
      <View className="flex-row items-center border border-gray-200 rounded-xl bg-white overflow-hidden">
        {leftIcon && (
          <View className="pl-4">
            <Ionicons name={leftIcon} size={18} color={themeColors.gray400} />
          </View>
        )}
        <BottomSheetTextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholderTextColor={themeColors.gray400}
          className="flex-1 min-w-0 text-base text-gray-700"
          style={styles.input}
        />
        {isSearching && (
          <ActivityIndicator size="small" color={themeColors.gray400} />
        )}
        {rightButtonLabel && onRightButtonPress && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRightButtonPress}
            className="px-3 py-2"
          >
            <ThemedText
              weight="semiBold"
              size="sm"
              className="text-primary text-[13px] bg-light-blue p-2 rounded-md"
            >
              {rightButtonLabel}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 54,
    minWidth: 0,
    flexShrink: 1,
    paddingHorizontal: 12,
    fontFamily: fontFamilies.regular,
  },
});

export default memo(LocationInput);

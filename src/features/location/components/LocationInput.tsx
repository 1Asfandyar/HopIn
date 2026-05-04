import { memo, useEffect, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/theme/components/ThemedText';
import { fontFamilies, themeColors } from '@/theme/tokens';
import { env } from '@/config/env';
import { useLocationSearch } from '../hooks/useLocationSearch';
import type { GooglePlaceData, LocationInputProps } from '@/types/types';

const LocationInput = ({
  label,
  placeholder = 'Search location...',
  initialValue,
  leftIcon,
  onPlaceSelected,
  containerClassName = '',
  rightButtonLabel,
  onRightButtonPress,
}: LocationInputProps) => {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const { countryRestriction, queryBias } = useLocationSearch();

  useEffect(() => {
    if (initialValue) {
      ref.current?.setAddressText(initialValue);
    }
  }, [initialValue]);

  return (
    <View className={`mb-2 ${containerClassName}`}>
      {label && (
        <ThemedText className="text-gray-600 text-sm mb-1">{label}</ThemedText>
      )}
      <View className="flex-row items-center border border-gray-200 rounded-xl bg-white overflow-visible">
        {leftIcon && (
          <View className="pl-4">
            <Ionicons name={leftIcon} size={18} color={themeColors.gray400} />
          </View>
        )}
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder={placeholder}
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(data as GooglePlaceData, details);
          }}
          query={{
            key: env.googlePlacesApiKey,
            language: 'en',
            types: 'geocode',
            ...queryBias,
            ...countryRestriction,
          }}
          styles={{
            container: {
              flex: 1,
            },
            textInputContainer: {
              backgroundColor: 'transparent',
            },
            textInput: {
              height: 54,
              paddingHorizontal: 12,
              fontSize: 16,
              color: themeColors.gray700,
              fontFamily: fontFamilies.regular,
              backgroundColor: 'transparent',
              borderWidth: 0,
              margin: 0,
            },
            listView: {
              backgroundColor: themeColors.white,
              borderWidth: 1,
              borderColor: themeColors.gray200,
              borderRadius: 12,
              marginTop: 4,
              elevation: 5,
              shadowColor: '#000',
              shadowOpacity: 0.08,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              zIndex: 9999,
              position: 'absolute',
              top: 54,
              left: 0,
              right: 0,
            },
            row: {
              paddingHorizontal: 14,
              paddingVertical: 12,
            },
            description: {
              fontSize: 14,
              color: themeColors.gray700,
              fontFamily: fontFamilies.regular,
            },
            separator: {
              height: 1,
              backgroundColor: themeColors.gray100,
            },
            poweredContainer: {
              display: 'none',
            },
          }}
          textInputProps={{
            placeholderTextColor: themeColors.gray400,
          }}
          enablePoweredByContainer={false}
          keyboardShouldPersistTaps="handled"
          listViewDisplayed="auto"
        />
        {rightButtonLabel && onRightButtonPress && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRightButtonPress}
            className="px-3 py-2"
          >
            <ThemedText
              weight="semiBold"
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

export default memo(LocationInput);

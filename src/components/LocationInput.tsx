import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ThemedText from '../theme/components/ThemedText';
import { fontFamilies, themeColors } from '../theme/tokens';
import { LocationInputProps } from './types';
import { useLocation } from '@/store/useLocation';

const GOOGLE_KEY = Constants.expoConfig?.extra?.googlePlacesApiKey;
const LocationInput = ({
  label,
  placeholder = 'Search location...',
  leftIcon,
  onPlaceSelected,
  containerClassName = '',
}: LocationInputProps) => {
  const ref = useRef(null);
  const currentLocation = useLocation(state => state.currentLocation);
  const locationBias = currentLocation
    ? {
        location: `${currentLocation.latitude},${currentLocation.longitude}`,
        radius: 50000,
      }
    : {};
  const countryRestriction = currentLocation?.countryCode
    ? {
        components: `country:${currentLocation.countryCode}`,
      }
    : {};

  return (
    <View className={`mb-2 ${containerClassName}`}>
      {label && (
        <ThemedText className="text-gray-600 text-sm mb-1">{label}</ThemedText>
      )}
      <View
        className="flex-row items-center border border-gray-200 rounded-xl bg-white"
        style={styles.container}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            <Ionicons name={leftIcon} size={18} color={themeColors.gray400} />
          </View>
        )}
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder={placeholder}
          fetchDetails={true}
          onPress={(data, details = null) => {
            onPlaceSelected(data, details);
          }}
          query={{
            key: GOOGLE_KEY,
            language: 'en',
            types: 'geocode',
            ...locationBias,
            ...countryRestriction,
          }}
          styles={{
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
      </View>
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
  },
  leftIcon: {
    paddingLeft: 16,
  },
});

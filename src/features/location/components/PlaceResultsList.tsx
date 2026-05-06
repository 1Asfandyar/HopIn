import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { PlaceResultsListProps } from '../types';

const PlaceResultsList = ({
  results,
  isLoading,
  error,
  onPlacePress,
}: PlaceResultsListProps) => {
  return (
    <View className="mt-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
      {results.map((place, index) => (
        <TouchableOpacity
          key={place.place_id ?? `${place.description}-${index}`}
          activeOpacity={0.7}
          onPress={() => onPlacePress(place)}
          className="flex-row items-start px-4 py-3 border-b border-gray-100"
        >
          <Ionicons
            name="location-outline"
            size={18}
            color={themeColors.gray400}
            style={styles.resultIcon}
          />
          <View className="flex-1">
            <ThemedText weight="semiBold" size="md" className="text-gray-800">
              {place.structured_formatting?.main_text ?? place.description}
            </ThemedText>
            {place.structured_formatting?.secondary_text && (
              <ThemedText size="sm" className="text-gray-500 mt-1">
                {place.structured_formatting.secondary_text}
              </ThemedText>
            )}
          </View>
        </TouchableOpacity>
      ))}
      {!isLoading && results.length === 0 && !error && (
        <ThemedText size="md" className="text-gray-500 px-4 py-3">
          No places found
        </ThemedText>
      )}
      {error && (
        <ThemedText size="md" className="text-red-500 px-4 py-3">
          {error.message}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultIcon: {
    marginRight: 10,
    marginTop: 2,
  },
});

export default memo(PlaceResultsList);

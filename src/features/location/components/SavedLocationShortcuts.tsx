import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/theme/components/ThemedText';
import type { SavedLocation } from '@/types/types';
import { mapLocationPickerStyles as styles } from './MapLocationPicker.styles';

type SavedLocationShortcutsProps = {
  savedLocations: SavedLocation[];
  modeColor: string;
  onSavedLocationSelected: (savedLocation: SavedLocation) => void;
};

const SavedLocationShortcuts = ({
  savedLocations,
  modeColor,
  onSavedLocationSelected,
}: SavedLocationShortcutsProps) => {
  if (savedLocations.length === 0) {
    return null;
  }

  return (
    <View style={styles.savedLocationsRow}>
      {savedLocations.slice(0, 4).map(savedLocation => (
        <TouchableOpacity
          key={savedLocation.id}
          activeOpacity={0.75}
          onPress={() => onSavedLocationSelected(savedLocation)}
          style={styles.savedLocationButton}
        >
          <Ionicons name="bookmark" size={14} color={modeColor} />
          <ThemedText
            size="sm"
            weight="semiBold"
            className="ml-1"
            style={{ color: modeColor }}
            numberOfLines={1}
          >
            {savedLocation.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SavedLocationShortcuts;

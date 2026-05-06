import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LOCATION_SELECTOR_CONTENT_Z_INDEX } from '../constants/location.constants';

type LocationSelectorLayoutProps = {
  children: React.ReactNode;
};

const LocationSelectorLayout = ({ children }: LocationSelectorLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 px-5" edges={['bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    zIndex: LOCATION_SELECTOR_CONTENT_Z_INDEX,
  },
});

export default LocationSelectorLayout;

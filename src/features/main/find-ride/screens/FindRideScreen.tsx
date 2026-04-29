import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FindRideScreen = () => {
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      className="flex-1 bg-white"
    >
      <View className="flex-1 bg-white" />
    </SafeAreaView>
  );
};

export default FindRideScreen;

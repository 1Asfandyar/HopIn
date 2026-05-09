import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';

type WelcomeScreenProps = {
  onContinue: () => void;
};

const WelcomeScreen = ({ onContinue }: WelcomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5">
        <View className="items-center pt-8">
          <Image
            source={require('../../../assets/logos/hopin_light.png')}
            className="h-20 w-40"
            resizeMode="contain"
          />
          <ThemedText
            size="2xl"
            weight="semiBold"
            className="text-gray-900 text-center mt-3"
          >
            Share the route.
          </ThemedText>
          <ThemedText
            size="2xl"
            weight="semiBold"
            className="text-gray-900 text-center"
          >
            Split the fuel.
          </ThemedText>
        </View>

        <View className="flex-1 justify-center">
          <Image
            source={require('../../../assets/illustrations/hopin_cab.png')}
            className="h-80 w-full"
            resizeMode="contain"
          />
        </View>

        <View className="pb-6">
          <ThemedButton
            title="Continue with Email"
            onPress={onContinue}
            rightIcon="mail-outline"
            containerClassName="py-4"
          />
          <ThemedText size="xs" className="text-gray-400 text-center mt-4">
            By continuing, you agree to our Terms & Conditions.
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

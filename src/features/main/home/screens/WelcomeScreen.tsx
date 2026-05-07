import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '@/theme/components/ThemedText';
import { useRouter } from 'expo-router';
import ThemedButton from '@/theme/components/ThemedButton';

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-[0.25] bg-white justify-center items-center">
        <Image
          source={require('../../../../assets/logos/hopin_light.png')}
          className="h-[35%] w-[45%]"
          resizeMode="contain"
        />
        <ThemedText className="text-xl text-gray-500" weight="semiBold">
          Share a ride.
        </ThemedText>
        <ThemedText className="text-xl text-gray-500" weight="semiBold">
          Save more. Travel better.
        </ThemedText>
      </View>

      <View className="flex-[0.6] bg-white justify-center items-center">
        <Image
          source={require('../../../../assets/illustrations/hopin_cab.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-[0.25] justify-end pb-4">
        <ThemedButton
          title="Get Started"
          variant="primary"
          weight="medium"
          onPress={() => router.push('/register')}
          containerClassName="bg-primary py-5 mx-4 rounded-3xl justify-center items-center"
          textClassName="text-white text-l"
        />

      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

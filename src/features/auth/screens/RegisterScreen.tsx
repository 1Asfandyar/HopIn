import { SafeAreaView } from 'react-native-safe-area-context';
import type { RegisterViewProps } from '../types';
import ThemedText from '@/theme/components/ThemedText';
import { Image, View } from 'react-native';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';

const RegisterScreen = (RegisterParams: RegisterViewProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-[0.25] bg-white justify-center items-center">
        <Image
          source={require('../../../assets/logos/hopin_light.png')}
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
          source={require('../../../assets/illustrations/hopin_cab.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex-[0.25] justify-end pb-4 px-4">
        <ThemedCard
          heading="Get started with Google"
          variant="primary"
          rightIcon="logo-google"
          headingSize="xl"
          subHeadingSize="md"
          iconSize={40}
          containerClassName="rounded-3xl p-5"
          rightIconContainerClassName="justify-center items-center ml-3"
          middleElement={
            <View>
              <ThemedText className="mt-1 text-gray-600">
                One tap signs you in.
              </ThemedText>
              <ThemedButton
                title={
                  RegisterParams.isSubmitting
                    ? 'Opening Google...'
                    : 'Get started'
                }
                variant='primary'
                weight="medium"
                loading={RegisterParams.isSubmitting}
                disabled={RegisterParams.isSubmitting}
                onPress={RegisterParams.onGooglePress}
                containerClassName="mt-5 py-4 rounded-2xl justify-center items-center"
                textClassName="text-lg text-primary"
              />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

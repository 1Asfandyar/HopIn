import { SafeAreaView } from 'react-native-safe-area-context';
import type { RegisterViewProps } from '../types';
import ThemedText from '@/theme/components/ThemedText';
import { Image, View } from 'react-native';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';

const RegisterScreen = (RegisterParams: RegisterViewProps) => {
  return (
    <SafeAreaView className="flex-1 justify-between bg-white px-4 py-5">
      <View className="items-center">
        <Image
          source={require('../../../assets/logos/hopin_light.png')}
          className="h-20 w-44"
          resizeMode="contain"
        />
        <ThemedText className="text-2xl" weight="semiBold">
          Get started
        </ThemedText>
      </View>

      <View className="flex-1 justify-center items-center">
        <Image
          source={require('../../../assets/illustrations/hopin_cab.png')}
          className="h-full w-full"
          resizeMode="contain"
        />
      </View>

      <ThemedCard
        heading="Continue with Google"
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
              One tap signs you in. If you are new here, HopIn creates your
              account automatically.
            </ThemedText>
            <ThemedButton
              title={
                RegisterParams.isSubmitting
                  ? 'Opening Google...'
                  : 'Get started with Google'
              }
              variant="outline"
              weight="medium"
              leftIcon="logo-google"
              loading={RegisterParams.isSubmitting}
              disabled={RegisterParams.isSubmitting}
              onPress={RegisterParams.onGooglePress}
              containerClassName="mt-5 py-4 rounded-2xl justify-center items-center"
              textClassName="text-lg text-primary"
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

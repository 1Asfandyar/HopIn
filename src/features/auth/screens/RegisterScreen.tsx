import { SafeAreaView } from 'react-native-safe-area-context';
import type { RegisterViewProps } from '@/types/types';
import ThemedText from '@/theme/components/ThemedText';
import { Image, View } from 'react-native';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedButton from '@/theme/components/ThemedButton';

const RegisterScreen = (RegisterParams: RegisterViewProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-[1]  bg-white justify-center items-center">
        <Image
          source={require('../../../assets/logos/hopin_light.png')}
          style={{ width: '55%', height: '45%' }}
          resizeMode="contain"
        />
        <ThemedText className="text-2xl" weight="semiBold">
          Create an account
        </ThemedText>
      </View>

      <View className="flex-[3]  mx-6">
        <View className="flex-row ">
          <ThemedText className="text-gray-700 pr-2">Full Name</ThemedText>
          {RegisterParams.fullNameTouched && RegisterParams.fullNameError && (
            <ThemedText className="text-red-500">
              ({RegisterParams.fullNameError})
            </ThemedText>
          )}
        </View>
        <ThemedInput
          placeholder="Ali"
          leftIcon="person"
          value={RegisterParams.fullName}
          onChangeText={RegisterParams.onFullNameChange}
          onBlur={RegisterParams.onFullNameBlur}
        />

        <View className="flex-row ">
          <ThemedText className="text-gray-700 pr-2">Mobile Number</ThemedText>
          {RegisterParams.phoneTouched && RegisterParams.phoneError && (
            <ThemedText className="text-red-500">
              ({RegisterParams.phoneError})
            </ThemedText>
          )}
        </View>
        <ThemedInput
          placeholder="+923456789101"
          keyboardType="numeric"
          leftIcon="phone-portrait"
          value={RegisterParams.phone}
          onChangeText={RegisterParams.onPhoneChange}
          onBlur={RegisterParams.onPhoneBlur}
        />

        <View className="flex-row ">
          <ThemedText className="text-gray-700 pr-2">Email</ThemedText>
          {RegisterParams.emailTouched && RegisterParams.emailError && (
            <ThemedText className="text-red-500">
              ({RegisterParams.emailError})
            </ThemedText>
          )}
        </View>
        <ThemedInput
          placeholder="ali@example.com"
          leftIcon="mail"
          value={RegisterParams.email}
          onChangeText={RegisterParams.onEmailChange}
          onBlur={RegisterParams.onEmailBlur}
        />

        <View className="flex-row ">
          <ThemedText className="text-gray-700 pr-2">Password</ThemedText>
          {RegisterParams.passwordTouched && RegisterParams.passwordError && (
            <ThemedText className="text-red-500">
              ({RegisterParams.passwordError})
            </ThemedText>
          )}
        </View>
        <ThemedInput
          placeholder="••••••••"
          value={RegisterParams.password}
          onChangeText={RegisterParams.onPasswordChange}
          onBlur={RegisterParams.onPasswordBlur}
          leftIcon="lock-closed"
          containerClassName="pb-4"
        />

        <ThemedButton
          title="Register"
          disabled={RegisterParams.isSubmitting}
          onPress={RegisterParams.onRegisterPress}
        />
      </View>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <ThemedText className="mx-2 text-gray-500 text-sm">
          or continue with
        </ThemedText>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <View className="flex-[1]  mx-6">
        <View className="pt-2">
          <ThemedButton
            title="Google"
            variant="outline"
            weight="medium"
            leftIcon="logo-google"
            containerClassName="bg-primary py-4 rounded-2xl justify-center items-center"
            textClassName="text-lg text-primary"
          />
        </View>
        <View className="mt-4 flex-row justify-center items-center">
          <ThemedText className="text-l text-gray-500">
            Already have an account?{' '}
          </ThemedText>
          <ThemedButton
            title="Login"
            variant="ghost"
            weight="medium"
            onPress={() => RegisterParams.router.replace('/login')}
            containerClassName="self-start py-1"
            textClassName="text-l text-primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

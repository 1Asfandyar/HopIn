import ThemedText from '@/theme/components/ThemedText';
import type { LoginViewProps } from '@/types/types';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedButton from '@/theme/components/ThemedButton';

const LoginScreen = (LoginParams: LoginViewProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-[0.15]  bg-white justify-center items-center">
        <Image
          source={require('../../../assets/logos/hopin_light.png')}
          className="h-[45%] w-[55%]"
          resizeMode="contain"
        />
        <ThemedText className="text-2xl" weight="semiBold">
          Welcome Back!
        </ThemedText>
      </View>
      {!LoginParams.isKeyboardVisible && (
        <View className=" flex-[0.375]  justify-center items-center">
          <Image
            source={require('../../../assets/illustrations/hopin_cab.png')}
            className="h-full w-[70%]"
            resizeMode="contain"
          />
        </View>
      )}

      <View className=" flex-[0.3]  mx-6">
        <View>
          <View className="flex-row">
            <ThemedText className="text-gray-700 pr-2">
              Mobile Number
            </ThemedText>
            {LoginParams.phoneTouched && LoginParams.phoneError && (
              <ThemedText className="text-red-500">
                ({LoginParams.phoneError})
              </ThemedText>
            )}
          </View>
          <ThemedInput
            placeholder="+923456789101"
            keyboardType="numeric"
            value={LoginParams.phone}
            onChangeText={LoginParams.onPhoneChange}
            onBlur={LoginParams.onPhoneBlur}
            leftIcon="phone-portrait"
            editable={!LoginParams.isSubmitting}
          />
        </View>
        <View className="mb-2">
          <View className="flex-row">
            <ThemedText className="text-gray-700 pr-2">Password</ThemedText>
            {LoginParams.passwordTouched && LoginParams.passwordError && (
              <ThemedText className="text-red-500">
                ({LoginParams.passwordError})
              </ThemedText>
            )}
          </View>
          <ThemedInput
            placeholder="••••••••"
            leftIcon="lock-closed"
            value={LoginParams.password}
            onChangeText={LoginParams.onPasswordChange}
            onBlur={LoginParams.onPasswordBlur}
            containerClassName="rounded-l"
            editable={!LoginParams.isSubmitting}
            secureTextEntry
          />
        </View>
        <ThemedButton
          title={LoginParams.isSubmitting ? 'Logging in...' : 'Login'}
          disabled={LoginParams.isSubmitting}
          variant="primary"
          weight="medium"
          containerClassName="bg-primary py-4 rounded-2xl justify-center items-center"
          textClassName="text-lg text-primary"
          onPress={LoginParams.onLoginPress}
        />
      </View>

      <View className=" flex-[0.175] mx-6">
        <View className="pt-2">
          <ThemedButton
            title="Google"
            variant="outline"
            weight="medium"
            leftIcon="logo-google"
            containerClassName="bg-primary py-4 rounded-2xl justify-center items-center"
            textClassName="text-lg text-primary"
            disabled={LoginParams.isSubmitting}
          />
        </View>
        <View className="mt-4 flex-row justify-center items-center">
          <ThemedText className="text-l text-gray-500">
            Dont have an account?{' '}
          </ThemedText>
          <ThemedButton
            title="Register"
            variant="ghost"
            weight="medium"
            onPress={() => LoginParams.router.replace('/register')}
            containerClassName="self-start py-1"
            textClassName="text-l text-primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

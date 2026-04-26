import ThemedText from '@/theme/ThemedText'
import { Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginViewProps } from './types'
import ThemedInput from '@/theme/ThemedInput'
import ThemedButton from '@/theme/ThemedButton'
import { useRouter } from 'expo-router'

const LoginView = (LoginParams: LoginViewProps) => {
  const router = useRouter()
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-[0.175]  bg-white justify-center items-center">
        <Image source={require('../assets/logos/hopin_light.png')}
        style={{ width:'55%', height: '45%' }}
        resizeMode="contain"/>
        <ThemedText className="text-xl text-gray-500" weight="semiBold">Welcome Back!</ThemedText>
        <ThemedText className="text-gray-500">Login to continue your journey</ThemedText>
      </View>

      <View className=' flex-[0.35]  justify-center items-center'>
        <Image source={require('../assets/illustrations/hopin_cab.png')}
          style={{width: '70%', height: '100%'}}
          resizeMode="contain" />
      </View>

      <View className=' flex-[0.3]  mx-6'>
        <View>
          <ThemedText className='text-gray-700'>Mobile Number</ThemedText>
          <ThemedInput
            placeholder='+923456789101'
            value={LoginParams.email}
            onChangeText={LoginParams.onEmailChange}
            onBlur={LoginParams.onEmailBlur}
          />
        </View>
        <View className='mb-2'>
          <ThemedText>Password</ThemedText>
          <ThemedInput
            placeholder="••••••••"
            value={LoginParams.password}
            onChangeText={LoginParams.onPasswordChange}
            onBlur={LoginParams.onPasswordBlur}
            containerClassName ='rounded-l'
          />
        </View>
        <ThemedButton
          title={LoginParams.isSubmitting ? 'Logging in...' : 'Login'}
          disabled={LoginParams.isSubmitting}
          variant="primary"
          weight="medium"
          containerClassName="bg-primary py-4 rounded-2xl justify-center items-center"
          textClassName="text-lg text-primary"
        />
      </View>

      <View className=' flex-[0.175] mx-6'>
        <View className='pt-2'>
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
            Dont have an account?{' '}
          </ThemedText>
          <ThemedButton
            title="Register"
            variant="ghost"
            weight="medium"
            onPress={() => router.push('/register')}
            containerClassName="self-start py-1"
            textClassName="text-l text-primary"
          />
        </View>
      </View>      
    </SafeAreaView>
  )
}

export default LoginView
import { View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThemedText from '@/theme/ThemedText'
import { useRouter } from 'expo-router'
import ThemedButton from '@/theme/ThemedButton'

const WelcomeView = () => {
const router = useRouter()
  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-[0.25] bg-white justify-center items-center">
            <Image source={require('../assets/logos/hopin_light.png')}
            style={{ width:'45%', height: '35%' }}
            resizeMode="contain"/>
            <ThemedText className="text-xl text-gray-500" weight="semiBold">Share a ride.</ThemedText>
            <ThemedText className="text-xl text-gray-500" weight="semiBold">Save more. Travel better.</ThemedText>
        </View>

      <View className="flex-[0.6] bg-white justify-center items-center">
        <Image source={require('../assets/illustrations/hopin_cab.png')} 
          style={{width: '100%', height: '100%'}}
          resizeMode="cover" />
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
          <View className="mt-4 flex-row justify-center items-center">
            <ThemedText className="text-l text-gray-500">
              Have an account?{' '}
            </ThemedText>
            <ThemedButton
              title="Login"
              variant="ghost"
              weight="medium"
              onPress={() => router.push('/login')}
              containerClassName="self-start py-1"
              textClassName="text-l text-primary"
            />
          </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeView
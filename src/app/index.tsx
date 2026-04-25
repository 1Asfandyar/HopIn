import { View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/theme/text/ThemedText";

export default function Page() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="flex-1 w-full max-w-[420px] self-center pt-8 pb-8">
        <View className="items-center">
          <Image
            source={require('../assets/logos/hopin_light.png')}
            className="w-56 h-20"
            resizeMode="contain"
          />
          <View className="mt-1 items-center">
            <ThemedText className="text-2xl text-gray-400" weight="medium">
              Share a ride.
            </ThemedText>
            <ThemedText className="text-2xl text-gray-400" weight="medium">
              Save more. Travel better.
            </ThemedText>
          </View>
        </View>

        <View className="flex-1 items-center justify-center py-6">
          <Image
            source={require('../assets/illustrations/hopin_cab.png')}
            className="h-full w-screen"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mx-12 pt-8" >
          <Pressable className="w-full items-center justify-center rounded-3xl bg-primary py-4">
            <ThemedText className="text-white text-xl font-semibold">Get Started</ThemedText>
          </Pressable>

          <View className="mt-4 flex-row items-center">
            <ThemedText className="text-xl text-gray-500">
              Have an account?{' '}
            </ThemedText>
            <Pressable>
              <ThemedText className="text-xl text-primary" weight="medium">
                Login
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

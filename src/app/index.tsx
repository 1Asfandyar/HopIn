import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="flex-1 justify-center max-w-md mx-auto">
        <Text className="text-4xl font-bold color-primary">Hello World</Text>
        <Text className="text-xl font-bold color-accent">This is the first page of your app.</Text>
      </View>
    </View>
  );
}
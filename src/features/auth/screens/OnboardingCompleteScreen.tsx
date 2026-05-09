import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthScaffold from '@/components/auth/AuthScaffold';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';

type OnboardingCompleteScreenProps = {
  onContinue: () => void;
};

const OnboardingCompleteScreen = ({
  onContinue,
}: OnboardingCompleteScreenProps) => {
  return (
    <AuthScaffold
      title="You're all set!"
      subtitle="Your email is verified and your Hopin profile is ready."
      footer={<ThemedButton title="Let's Go" onPress={onContinue} />}
    >
      <View className="flex-1 items-center justify-center">
        <View className="h-28 w-28 items-center justify-center rounded-full bg-light-blue">
          <Ionicons
            name="checkmark-circle"
            size={82}
            color={themeColors.primary}
          />
        </View>
        <ThemedText className="text-gray-500 text-center mt-6 px-8">
          Open Hopin, enter where you're going, then find matching rides or
          offer your empty seats.
        </ThemedText>
      </View>
    </AuthScaffold>
  );
};

export default OnboardingCompleteScreen;

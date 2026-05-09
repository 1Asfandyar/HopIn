import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '@/theme/components/ThemedText';

type AuthScaffoldProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

const AuthScaffold = ({
  title,
  subtitle,
  children,
  footer,
}: AuthScaffoldProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-1 px-5 pt-4">
          <View className="mt-6 mb-8">
            <ThemedText size="3xl" weight="semiBold" className="text-gray-900">
              {title}
            </ThemedText>
            {subtitle && (
              <ThemedText size="md" className="text-gray-500 mt-2">
                {subtitle}
              </ThemedText>
            )}
          </View>

          <View className="flex-1">{children}</View>

          {footer && <View className="pb-5">{footer}</View>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScaffold;

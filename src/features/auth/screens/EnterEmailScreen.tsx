import { useMemo, useState } from 'react';
import AuthScaffold from '@/components/auth/AuthScaffold';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import {
  getEmailValidationMessage,
  isValidEmail,
  normalizeEmail,
  OTP_LENGTH,
} from '../schemas/authValidation';

type EnterEmailScreenProps = {
  isSubmitting: boolean;
  initialEmail?: string;
  onSubmit: (email: string) => Promise<void>;
};

const EnterEmailScreen = ({
  isSubmitting,
  initialEmail = '',
  onSubmit,
}: EnterEmailScreenProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string | null>(null);
  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);
  const canSubmit = isValidEmail(email);

  const handleSubmit = async () => {
    const validationMessage = getEmailValidationMessage(email);
    setError(validationMessage);

    if (validationMessage) {
      return;
    }

    await onSubmit(normalizedEmail);
  };

  return (
    <AuthScaffold
      title="Enter your email"
      subtitle={`We'll send you a ${OTP_LENGTH}-digit code to verify your account.`}
      footer={
        <ThemedButton
          title={isSubmitting ? 'Sending code...' : 'Send OTP'}
          loading={isSubmitting}
          disabled={!canSubmit || isSubmitting}
          onPress={handleSubmit}
        />
      }
    >
      <ThemedInput
        label="Email address"
        placeholder="example@email.com"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (error) {
            setError(null);
          }
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon="mail-outline"
      />
      {error && (
        <ThemedText size="sm" className="text-red-500 mt-1">
          {error}
        </ThemedText>
      )}
    </AuthScaffold>
  );
};

export default EnterEmailScreen;

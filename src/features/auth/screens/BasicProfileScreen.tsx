import { useState } from 'react';
import AuthScaffold from '@/components/auth/AuthScaffold';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import {
  getFullNameValidationMessage,
  normalizeFullName,
} from '../schemas/authValidation';

type BasicProfileScreenProps = {
  initialFullName?: string;
  onContinue: (fullName: string) => void;
};

const BasicProfileScreen = ({
  initialFullName = '',
  onContinue,
}: BasicProfileScreenProps) => {
  const [fullName, setFullName] = useState(initialFullName);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    const validationMessage = getFullNameValidationMessage(fullName);
    setError(validationMessage);

    if (!validationMessage) {
      onContinue(normalizeFullName(fullName));
    }
  };

  return (
    <AuthScaffold
      title="Your details"
      subtitle="Please tell us about yourself."
      footer={<ThemedButton title="Continue" onPress={handleContinue} />}
    >
      <ThemedInput
        label="Full name"
        placeholder="Ahmad Khan"
        value={fullName}
        onChangeText={text => {
          setFullName(text);
          if (error) {
            setError(null);
          }
        }}
        autoCapitalize="words"
        leftIcon="person-outline"
      />
      {error && (
        <ThemedText size="sm" className="text-red-500 mt-1">
          {error}
        </ThemedText>
      )}
    </AuthScaffold>
  );
};

export default BasicProfileScreen;

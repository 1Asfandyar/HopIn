import { useRef } from 'react';
import { TextInput, View } from 'react-native';
import { fontFamilies, themeColors } from '@/theme/tokens';
import { OTP_LENGTH } from '@/features/auth/schemas/authValidation';

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

const OtpInput = ({ value, onChange, hasError = false }: OtpInputProps) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const digits = Array.from(
    { length: OTP_LENGTH },
    (_, index) => value[index] ?? '',
  );

  const updateDigit = (text: string, index: number) => {
    const nextText = text.replace(/\D/g, '');

    if (nextText.length > 1) {
      const pastedOtp = nextText.slice(0, OTP_LENGTH);
      onChange(pastedOtp);
      inputRefs.current[Math.min(pastedOtp.length, OTP_LENGTH - 1)]?.focus();
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = nextText;
    const nextValue = nextDigits.join('').slice(0, OTP_LENGTH);
    onChange(nextValue);

    if (nextText && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between mt-6 mb-4">
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
          value={digit}
          onChangeText={text => updateDigit(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          autoFocus={index === 0}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={1}
          className={`h-14 w-12 rounded-2xl border text-center text-xl text-gray-900 ${
            hasError ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
          }`}
          style={{
            fontFamily: fontFamilies.semiBold,
            color: themeColors.gray900,
          }}
        />
      ))}
    </View>
  );
};

export default OtpInput;

import { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import AuthScaffold from '@/components/auth/AuthScaffold';
import OtpInput from '@/components/auth/OtpInput';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { APP_ROUTES } from '@/constants/appRoutes';
import { isValidOtp, OTP_LENGTH } from '../schemas/authValidation';

type VerifyOtpScreenProps = {
  email: string;
  isSubmitting: boolean;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
};

const RESEND_SECONDS = 30;

const VerifyOtpScreen = ({
  email,
  isSubmitting,
  onVerify,
  onResend,
}: VerifyOtpScreenProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const submittedOtpRef = useRef<string | null>(null);
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleVerify = useCallback(
    async (nextOtp = otp) => {
      if (!isValidOtp(nextOtp)) {
        setError(`Please enter the ${OTP_LENGTH}-digit OTP.`);
        return;
      }

      if (isVerifyingRef.current || submittedOtpRef.current === nextOtp) {
        return;
      }

      isVerifyingRef.current = true;
      submittedOtpRef.current = nextOtp;

      try {
        setError(null);
        await onVerify(nextOtp);
      } catch {
        setError('Incorrect OTP. Please try again.');
      } finally {
        isVerifyingRef.current = false;
      }
    },
    [onVerify, otp],
  );

  useEffect(() => {
    if (isValidOtp(otp) && !isSubmitting) {
      handleVerify(otp);
    }
  }, [handleVerify, isSubmitting, otp]);

  const handleResend = async () => {
    await onResend();
    setOtp('');
    submittedOtpRef.current = null;
    isVerifyingRef.current = false;
    setSecondsLeft(RESEND_SECONDS);
    setError(null);
  };

  return (
    <AuthScaffold
      title="Enter OTP"
      subtitle={`We sent a ${OTP_LENGTH}-digit code to:\n${email}`}
      footer={
        <ThemedButton
          title={isSubmitting ? 'Verifying...' : 'Verify'}
          loading={isSubmitting}
          disabled={!isValidOtp(otp) || isSubmitting}
          onPress={() => handleVerify()}
        />
      }
    >
      <TouchableOpacity
        className="mb-5 self-start"
        onPress={() => router.replace(APP_ROUTES.auth.enterEmail)}
      >
        <ThemedText className="text-primary" weight="medium">
          Change email
        </ThemedText>
      </TouchableOpacity>

      <OtpInput
        value={otp}
        hasError={Boolean(error)}
        onChange={value => {
          if (value !== otp) {
            submittedOtpRef.current = null;
          }

          setOtp(value);
          if (error) {
            setError(null);
          }
        }}
      />

      {error && (
        <ThemedText size="sm" className="text-red-500 mb-3">
          {error}
        </ThemedText>
      )}

      <View className="items-center mt-2">
        {secondsLeft > 0 ? (
          <ThemedText className="text-gray-500">
            Resend OTP in 00:{String(secondsLeft).padStart(2, '0')}
          </ThemedText>
        ) : (
          <TouchableOpacity disabled={isSubmitting} onPress={handleResend}>
            <ThemedText className="text-primary" weight="semiBold">
              Resend OTP
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </AuthScaffold>
  );
};

export default VerifyOtpScreen;

import { useState } from 'react';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import VerifyOtpScreen from '@/features/auth/screens/VerifyOtpScreen';
import { useAuthStore } from '@/store/auth.store';
import { useOnboardingStore } from '@/store/onboarding.store';
import { showFeedback } from '@/utils/errors';

const VerifyOtp = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const storedEmail = useOnboardingStore(state => state.email);
  const email = params.email ?? storedEmail;
  const sendEmailOtp = useAuthStore(state => state.sendEmailOtp);
  const verifyEmailOtp = useAuthStore(state => state.verifyEmailOtp);
  const [isSubmitting, setSubmitting] = useState(false);

  if (!email) {
    return <Redirect href={APP_ROUTES.auth.enterEmail} />;
  }

  const handleVerify = async (otp: string) => {
    setSubmitting(true);

    try {
      const user = await verifyEmailOtp(email, otp);
      router.replace(
        user?.isProfileComplete
          ? APP_ROUTES.main.home
          : APP_ROUTES.auth.basicProfile,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setSubmitting(true);

    try {
      await sendEmailOtp(email);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Couldn't send OTP. Please check your email and try again.";
      showFeedback("Couldn't send OTP", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <VerifyOtpScreen
      email={email}
      isSubmitting={isSubmitting}
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
};

export default VerifyOtp;

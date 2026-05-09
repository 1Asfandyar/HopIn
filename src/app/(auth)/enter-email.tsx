import { useState } from 'react';
import { type Href, useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import EnterEmailScreen from '@/features/auth/screens/EnterEmailScreen';
import { useAuthStore } from '@/store/auth.store';
import { useOnboardingStore } from '@/store/onboarding.store';
import { showFeedback } from '@/utils/errors';

const EnterEmail = () => {
  const router = useRouter();
  const sendEmailOtp = useAuthStore(state => state.sendEmailOtp);
  const email = useOnboardingStore(state => state.email);
  const setEmail = useOnboardingStore(state => state.setEmail);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (nextEmail: string) => {
    setSubmitting(true);

    try {
      await sendEmailOtp(nextEmail);
      setEmail(nextEmail);
      router.push(
        `${APP_ROUTES.auth.verifyOtp}?email=${encodeURIComponent(
          nextEmail,
        )}` as unknown as Href,
      );
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
    <EnterEmailScreen
      initialEmail={email}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default EnterEmail;

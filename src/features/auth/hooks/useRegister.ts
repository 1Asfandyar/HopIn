import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';
import { showFeedback } from '@/utils/errors';

export const useRegister = () => {
  const signInWithGoogle = useAuthStore(state => state.signInWithGoogle);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleGooglePress = async () => {
    setSubmitting(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to continue with Google.';
      showFeedback('Google sign-in failed', message);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    isSubmitting,
    onGooglePress: handleGooglePress,
  };
};

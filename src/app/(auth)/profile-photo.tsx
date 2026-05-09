import { useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import ProfilePhotoScreen from '@/features/auth/screens/ProfilePhotoScreen';
import { USER_ROLES } from '@/constants/roles';
import { useAuthStore } from '@/store/auth.store';
import { useOnboardingStore } from '@/store/onboarding.store';
import { showFeedback } from '@/utils/errors';

const ProfilePhoto = () => {
  const router = useRouter();
  const completeProfile = useAuthStore(state => state.completeProfile);
  const fullName = useOnboardingStore(state => state.fullName);
  const role = useOnboardingStore(state => state.role);
  const setPhotoUrl = useOnboardingStore(state => state.setPhotoUrl);
  const [isSubmitting, setSubmitting] = useState(false);

  if (!fullName || !role) {
    return <Redirect href={APP_ROUTES.auth.basicProfile} />;
  }

  const handleComplete = async (photoUrl?: string) => {
    setSubmitting(true);

    try {
      setPhotoUrl(photoUrl ?? null);
      await completeProfile({
        fullName,
        role: role ?? USER_ROLES.rider,
        photoUrl,
      });
      router.replace(APP_ROUTES.auth.complete);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to save your profile.';
      showFeedback('Profile save failed', message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProfilePhotoScreen
      isSubmitting={isSubmitting}
      onComplete={handleComplete}
    />
  );
};

export default ProfilePhoto;

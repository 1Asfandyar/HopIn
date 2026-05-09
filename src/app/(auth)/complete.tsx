import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import OnboardingCompleteScreen from '@/features/auth/screens/OnboardingCompleteScreen';
import { useOnboardingStore } from '@/store/onboarding.store';

const Complete = () => {
  const router = useRouter();
  const resetOnboarding = useOnboardingStore(state => state.reset);

  return (
    <OnboardingCompleteScreen
      onContinue={() => {
        resetOnboarding();
        router.replace(APP_ROUTES.main.home);
      }}
    />
  );
};

export default Complete;

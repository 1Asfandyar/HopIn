import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import BasicProfileScreen from '@/features/auth/screens/BasicProfileScreen';
import { useOnboardingStore } from '@/store/onboarding.store';

const BasicProfile = () => {
  const router = useRouter();
  const fullName = useOnboardingStore(state => state.fullName);
  const setFullName = useOnboardingStore(state => state.setFullName);

  return (
    <BasicProfileScreen
      initialFullName={fullName}
      onContinue={nextFullName => {
        setFullName(nextFullName);
        router.push(APP_ROUTES.auth.roleSelection);
      }}
    />
  );
};

export default BasicProfile;

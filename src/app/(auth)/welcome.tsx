import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import WelcomeScreen from '@/features/auth/screens/WelcomeScreen';

const Welcome = () => {
  const router = useRouter();

  return (
    <WelcomeScreen onContinue={() => router.push(APP_ROUTES.auth.enterEmail)} />
  );
};

export default Welcome;

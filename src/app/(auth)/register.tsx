import { useRegister } from '@/features/auth/hooks/useRegister';
import RegisterScreen from '@/features/auth/screens/RegisterScreen';

const Register = () => {
  const { isSubmitting, onGooglePress } = useRegister();

  return (
    <RegisterScreen isSubmitting={isSubmitting} onGooglePress={onGooglePress} />
  );
};

export default Register;

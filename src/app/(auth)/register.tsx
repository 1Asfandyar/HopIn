import { Redirect } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';

const Register = () => {
  return <Redirect href={APP_ROUTES.auth.welcome} />;
};

export default Register;

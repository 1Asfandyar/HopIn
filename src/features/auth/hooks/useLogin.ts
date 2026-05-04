import { useAuth } from '@/store/useAuth';
import { useLocation } from '@/store/useLocation';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { showFeedback } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import {
  loginInitialValues,
  loginValidationSchema,
} from '../validation/auth.validation';

export const useLogin = () => {
  const router = useRouter();
  const login = useAuth(state => state.login);
  const fetchCurrentLocation = useLocation(state => state.fetchCurrentLocation);
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      try {
        await login({
          identifier: values.phone,
          password: values.password,
        });
        await fetchCurrentLocation();
        router.replace('/');
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : FEEDBACK_MESSAGES.loginFailed;
        showFeedback('Login failed', message);
      }
    },
  });

  return { ...formik, router };
};

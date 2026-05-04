import { useAuth } from '@/store/useAuth';
import { useLocation } from '@/store/useLocation';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showFeedback } from '@/utils/errors';

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const useLogin = () => {
  const router = useRouter();
  const login = useAuth(state => state.login);
  const fetchCurrentLocation = useLocation(state => state.fetchCurrentLocation);
  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema,
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
          error instanceof Error ? error.message : 'Unable to log in.';
        showFeedback('Login failed', message);
      }
    },
  });

  return { ...formik, router };
};

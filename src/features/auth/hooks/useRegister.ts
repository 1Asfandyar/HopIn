import { useAuth } from '@/store/useAuth';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showFeedback } from '@/utils/errors';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain letter')
    .matches(/[0-9]/, 'Password must contain number')
    .required('Password is required'),
});

export const useRegister = () => {
  const router = useRouter();
  const register = useAuth(state => state.register);
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await register(values);
        router.replace('/');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to register.';
        showFeedback('Registration failed', message);
      }
    },
  });
  return { ...formik, router };
};

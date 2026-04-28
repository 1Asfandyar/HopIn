import { useAuth } from '@/store/useAuth';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),

  phone: Yup.number().test(
    'len',
    'Phone number must be exactly 10 digits',
    value => {
      if (!value) return false;
      return String(value).length === 10;
    },
  ),

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
      phone: null,
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        console.log('Registration values:', values);
        await register(values.email, values.password);
        router.replace('/');
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
  });
  return { ...formik, router };
};

import { useAuth } from '@/store/useAuth';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        console.log('Login values:', values);
        await login(values.phone, values.password);
        router.replace('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  return { ...formik, router };
};

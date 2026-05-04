import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { showFeedback } from '@/utils/errors';
import { FEEDBACK_MESSAGES } from '@/config/constants';
import {
  registerInitialValues,
  registerValidationSchema,
} from '../validation/auth.validation';

export const useRegister = () => {
  const router = useRouter();
  const register = useAuthStore(state => state.register);
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async values => {
      try {
        await register(values);
        router.replace('/');
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : FEEDBACK_MESSAGES.registerFailed;
        showFeedback('Registration failed', message);
      }
    },
  });
  return { ...formik, router };
};

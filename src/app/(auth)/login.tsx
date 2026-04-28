import { useLogin } from '@/features/auth/hooks/useLogin';
import LoginScreen from '@/features/auth/screens/LoginScreen';

const login = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    router,
  } = useLogin();

  return (
    <LoginScreen
      phone={values.phone}
      password={values.password}
      phoneError={errors.phone}
      passwordError={errors.password}
      phoneTouched={touched.phone}
      passwordTouched={touched.password}
      isSubmitting={isSubmitting}
      onPhoneChange={phone => setFieldValue('phone', phone)}
      onPasswordChange={password => setFieldValue('password', password)}
      onPhoneBlur={() => setFieldTouched('phone', true)}
      onPasswordBlur={() => setFieldTouched('password', true)}
      onLoginPress={() => handleSubmit()}
      router={router}
    />
  );
};

export default login;

import { useRegister } from '@/features/auth/hooks/useRegister';
import RegisterScreen from '@/features/auth/screens/RegisterScreen';

const Register = () => {
  const {
    values,
    errors,
    touched,
    router,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = useRegister();

  return (
    <RegisterScreen
      fullName={values.fullName}
      phone={values.phone}
      email={values.email}
      password={values.password}
      router={router}
      fullNameError={errors.fullName}
      phoneError={errors.phone}
      emailError={errors.email}
      passwordError={errors.password}
      fullNameTouched={touched.fullName}
      phoneTouched={touched.phone}
      emailTouched={touched.email}
      passwordTouched={touched.password}
      isSubmitting={isSubmitting}
      onFullNameChange={fullName => setFieldValue('fullName', fullName)}
      onPhoneChange={phone => setFieldValue('phone', phone)}
      onEmailChange={email => setFieldValue('email', email)}
      onPasswordChange={password => setFieldValue('password', password)}
      onFullNameBlur={() => setFieldTouched('fullName', true)}
      onPhoneBlur={() => setFieldTouched('phone', true)}
      onEmailBlur={() => setFieldTouched('email', true)}
      onPasswordBlur={() => setFieldTouched('password', true)}
      onRegisterPress={() => handleSubmit()}
    />
  );
};

export default Register;

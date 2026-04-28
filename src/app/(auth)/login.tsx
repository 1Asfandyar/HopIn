import { useLogin } from '@/features/auth/hooks/useLogin';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const Login = () => {
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

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
      isKeyboardVisible={isKeyboardVisible}
    />
  );
};

export default Login;

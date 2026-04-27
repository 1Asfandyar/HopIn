import { useLogin } from '@/features/auth/hooks/useLogin'
import LoginScreen from '@/features/auth/screens/LoginScreen'
import { useRouter } from 'expo-router'


const login = () => {
  const formik = useLogin()
  const router = useRouter()

  return (
    <LoginScreen
      phone={formik.values.phone}
      password={formik.values.password}
      phoneError={formik.errors.phone}
      passwordError={formik.errors.password}
      phoneTouched={formik.touched.phone}
      passwordTouched={formik.touched.password}
      isSubmitting={formik.isSubmitting}
      onPhoneChange={(phone) => formik.setFieldValue('phone', phone)}
      onPasswordChange={(password) => formik.setFieldValue('password', password)}
      onPhoneBlur={() => formik.setFieldTouched('phone', true)}
      onPasswordBlur={() => formik.setFieldTouched('password', true)}
      onLoginPress={() => formik.handleSubmit()}
      router={router}
    />
  )
}

export default login

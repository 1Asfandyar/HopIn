import { useLogin } from '@/hooks/useLogin'
import LoginView from '@/(screens)/LoginView'
import { useRouter } from 'expo-router'


const login = () => {
  const formik = useLogin()
  const router = useRouter()

  return (
    <LoginView 
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

import { useLogin } from '@/hooks/useLogin'
import LoginView from '@/(screens)/LoginView'


const login = () => {
  const formik = useLogin()

  return (
    <LoginView 
      // Current values from formik
      phone={formik.values.phone}
      password={formik.values.password}
      // Error messages from formik
      phoneError={formik.errors.phone}
      passwordError={formik.errors.password}
      // Whether user touched each field
      phoneTouched={formik.touched.phone}
      passwordTouched={formik.touched.password}
      // Whether form is submitting
      isSubmitting={formik.isSubmitting}
      // Functions to call when user interacts
      onPhoneChange={(phone) => formik.setFieldValue('phone', phone)}
      onPasswordChange={(password) => formik.setFieldValue('password', password)}
      onPhoneBlur={() => formik.setFieldTouched('phone', true)}
      onPasswordBlur={() => formik.setFieldTouched('password', true)}
      onLoginPress={() => formik.handleSubmit()}
    />
  )
}

export default login

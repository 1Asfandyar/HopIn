import { useLogin } from '@/hooks/useLogin'
import LoginView from '@/(screens)/LoginView'


const login = () => {
  const formik = useLogin()

  return (
    <LoginView 
      // Current values from formik
      email={formik.values.email}
      password={formik.values.password}
      // Error messages from formik
      emailError={formik.errors.email}
      passwordError={formik.errors.password}
      // Whether user touched each field
      emailTouched={formik.touched.email}
      passwordTouched={formik.touched.password}
      // Whether form is submitting
      isSubmitting={formik.isSubmitting}
      // Functions to call when user interacts
      onEmailChange={(email) => formik.setFieldValue('email', email)}
      onPasswordChange={(password) => formik.setFieldValue('password', password)}
      onEmailBlur={() => formik.setFieldTouched('email', true)}
      onPasswordBlur={() => formik.setFieldTouched('password', true)}
      onLoginPress={() => formik.handleSubmit()}
    />
  )
}

export default login

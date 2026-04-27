import { useRegister } from '@/hooks/useRegister'
import RegisterView from '@/(screens)/RegisterView'
import { useRouter } from 'expo-router'

const register = () => {
    const formik = useRegister()
    const router = useRouter()
  
  return (
    <RegisterView 
      fullName={formik.values.fullName}
      phone={formik.values.phone}
      email={formik.values.email}
      password={formik.values.password}
      router={router}
      fullNameError={formik.errors.fullName}
      phoneError={formik.errors.phone}
      emailError={formik.errors.email}
      passwordError={formik.errors.password}
      fullNameTouched={formik.touched.fullName}
      phoneTouched={formik.touched.phone}
      emailTouched={formik.touched.email}
      passwordTouched={formik.touched.password}
      isSubmitting={formik.isSubmitting}
      onFullNameChange={(fullName) => formik.setFieldValue('fullName', fullName)}
      onPhoneChange={(phone) => formik.setFieldValue('phone', phone)}
      onEmailChange={(email) => formik.setFieldValue('email', email)}
      onPasswordChange={(password) => formik.setFieldValue('password', password)}
      onFullNameBlur={() => formik.setFieldTouched('fullName', true)}
      onPhoneBlur={() => formik.setFieldTouched('phone', true)}
      onEmailBlur={() => formik.setFieldTouched('email', true)}
      onPasswordBlur={() => formik.setFieldTouched('password', true)}
      onRegisterPress={() => formik.handleSubmit()}
    />
  )
}

export default register
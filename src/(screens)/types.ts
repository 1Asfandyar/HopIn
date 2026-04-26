export interface LoginViewProps {
  // These come from Formik (from the parent container)
  phone: string                              // Current phone value
  password: string                           // Current password value
  phoneError: string | undefined             // Error message for phone
  passwordError: string | undefined          // Error message for password
  phoneTouched: boolean | undefined          // Did user type in phone?
  passwordTouched: boolean | undefined       // Did user type in password?
  isSubmitting: boolean                      // Is login in progress?  
  onPhoneChange: (phone: string) => void     // When user types phone
  onPasswordChange: (password: string) => void // When user types password
  onPhoneBlur: () => void                    // When user leaves phone field
  onPasswordBlur: () => void                 // When user leaves password field
  onLoginPress: () => void    
}
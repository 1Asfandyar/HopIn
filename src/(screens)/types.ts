export interface LoginViewProps {
  // These come from Formik (from the parent container)
  email: string                              // Current email value
  password: string                           // Current password value
  emailError: string | undefined             // Error message for email
  passwordError: string | undefined          // Error message for password
  emailTouched: boolean | undefined          // Did user type in email?
  passwordTouched: boolean | undefined       // Did user type in password?
  isSubmitting: boolean                      // Is login in progress?  
  onEmailChange: (email: string) => void     // When user types email
  onPasswordChange: (password: string) => void // When user types password
  onEmailBlur: () => void                    // When user leaves email field
  onPasswordBlur: () => void                 // When user leaves password field
  onLoginPress: () => void    
}
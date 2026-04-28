import type { Router } from 'expo-router';

export interface LoginViewProps {
  // These come from Formik (from the parent container)
  phone: string; // Current phone value
  password: string; // Current password value
  phoneError: string | undefined; // Error message for phone
  passwordError: string | undefined; // Error message for password
  phoneTouched: boolean | undefined; // Did user type in phone?
  passwordTouched: boolean | undefined; // Did user type in password?
  isSubmitting: boolean; // Is login in progress?
  onPhoneChange: (phone: string) => void; // When user types phone
  onPasswordChange: (password: string) => void; // When user types password
  onPhoneBlur: () => void; // When user leaves phone field
  onPasswordBlur: () => void; // When user leaves password field
  onLoginPress: () => void;
  router: Router;
}

export interface RegisterViewProps {
  fullName: string;
  phone: number | null;
  email: string;
  password: string;
  fullNameError: string | undefined;
  phoneError: string | undefined;
  emailError: string | undefined;
  passwordError: string | undefined;
  fullNameTouched: boolean | undefined;
  phoneTouched: boolean | undefined;
  emailTouched: boolean | undefined;
  passwordTouched: boolean | undefined;
  isSubmitting: boolean;
  onFullNameChange: (fullName: string) => void;
  onPhoneChange: (phone: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onFullNameBlur: () => void;
  onPhoneBlur: () => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onRegisterPress: () => void;
  router: Router;
}

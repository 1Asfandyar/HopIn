import * as Yup from 'yup';

export const loginInitialValues = {
  phone: '',
  password: '',
};

export const registerInitialValues = {
  fullName: '',
  phone: '',
  email: '',
  password: '',
};

export const loginValidationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain letter')
    .matches(/[0-9]/, 'Password must contain number')
    .required('Password is required'),
});

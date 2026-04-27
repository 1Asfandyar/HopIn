import {useFormik} from 'formik'
import { FullWindowOverlay } from 'react-native-screens'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),

    phone: Yup.number()
    .test('len', 'Phone number must be exactly 10 digits', (value) => {
        if (!value) return false
        return String(value).length === 10
    }),

    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

export const useRegister = () =>{
    const formik = useFormik({
        initialValues: {
            fullName: '',
            phone: null,
            email: '',
            password: '',   
        },
        validationSchema,
        onSubmit: async (values) => {
            // Handle registration logic here
            console.log('Registration values:', values)
            // TODO: Call API here
            // const response = await fetch('https://api.example.com/login', {
            //   method: 'POST',
            //   body: JSON.stringify(values),
            // })
        
        }
    })
    return formik
}
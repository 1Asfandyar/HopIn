import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const useLogin = () =>{
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            // Handle login logic here
            console.log('Login values:', values)
            // TODO: Call API here
            // const response = await fetch('https://api.example.com/login', {
            //   method: 'POST',
            //   body: JSON.stringify(values),
            // })
        
        },
    })

    return formik
}
import * as yup from 'yup';

export const registerValidate = {
    initialState: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        country_code: '',
        phone: '',
    },
    schema: yup.object().shape({
        first_name: yup
            .string()
            .min(2, "First name must be at least 2 characters")
            .trim()
            .required('* First name is required'),
        last_name: yup
            .string()
            .min(2, "Last name must be at leasr 2 characters")
            .trim()
            .required('* Last name is required'),
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Email is required'),
        password: yup
            .string()
            .min(6)
            .trim()
            .required('* Password is required'),
        country_code: yup
            .string()
            .required('* Code is required'),
        phone: yup
            .string()
            .min(7, "Please enter a valid mobile number.")
            .max(15, "Please enter a valid mobile number.")
            .matches(/^[0-9]+$/)
            .trim()
            .required('* Mobile number is required'),
    })
}

export const loginValidate = {
    initialState: { email: '', password: '' },
    schema: yup.object().shape({
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Email is required'),
        password: yup
            .string()
            .min(4)
            .trim()
            .required('* Password is required'),
    })
}

export const completeProfileValidate = {
    initialState: { gender: '', dob: '', education: '', experience: '', about: '' },
    schema: yup.object().shape({
        gender: yup
            .string()
            .required('* Gender is required'),
        dob: yup
            .string()
            .required('* Date of birth is required'),
        education: yup
            .string()
            .required('* Education is Required'),
        experience: yup
            .string()
            .required('* Experience is required'),
        about: yup
            .string()
            .required('* About is required'),
    })
}

export const forgotValidate = {
    initialState: { email: '' },
    schema: yup.object().shape({
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Email is required'),
    })
}

export const resetPasswordValidate = {
    initialState: { password: '', confirmPassword: '' },
    schema: yup.object().shape({
        password: yup
            .string()
            .min(4)
            .trim()
            .required('Password is must be required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], "Password must match")
            .trim()
            .required('Confirm password is must be required'),
    })
}

export const editProfileValidate = {
    initialState: { first_name: '', last_name: '', gender: '', email: '', dob: '', education: '', experience: '', about: '' },
    schema: yup.object().shape({
        first_name: yup
            .string()
            .min(2, "First name must be at least 2 characters")
            .trim()
            .required('* Required'),
        last_name: yup
            .string()
            .min(2, "Last name must be at leasr 2 characters")
            .trim()
            .required('* Required'),
        gender: yup
            .string()
            .required('* Required'),
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Required'),
        dob: yup
            .string()
            .required('* Required'),
        education: yup
            .string()
            .required('* Required'),
        experience: yup
            .string()
            .required('* Required'),
        about: yup
            .string()
            .required('* Required')
    })
}

export const hourlyRateValidate = {
    initialState: { hourly_rate: '' },
    schema: yup.object().shape({
        hourly_rate: yup.number()
            .positive('Hourly rate must be a positive number')
            .required('* Hourly rate is required')
    })
}

export const contactUsValidate = {
    initialState: { email: '', description: '', image: '' },
    schema: yup.object().shape({
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Email is required'),
        description: yup
            .string()
            .required('* Description is required'),
        image: yup
            .string()
            .required('* ScreenShot is required'),
    })
}

export const changePasswordValidate = {
    initialState: { current_password: '', new_password: '', confirmPassword: '' },
    schema: yup.object().shape({
        current_password: yup
            .string()
            .min(4)
            .trim()
            .required('Password is must be required'),
        new_password: yup
            .string()
            .min(4)
            .trim()
            .required('New password is must be required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('new_password'), null], "Password must match")
            .trim()
            .required('Confirm password is must be required'),
    })
}
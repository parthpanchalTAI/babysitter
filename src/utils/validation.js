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
            .required('* Required'),
        last_name: yup
            .string()
            .min(2, "Last name must be at leasr 2 characters")
            .trim()
            .required('* Required'),
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Required'),
        password: yup
            .string()
            .min(4)
            .trim()
            .required('* Required'),
        country_code: yup
            .string()
            .required('* Required'),
        phone: yup
            .string()
            .min(7, "Please enter a valid mobile number.")
            .max(15, "Please enter a valid mobile number.")
            .matches(/^[0-9]+$/)
            .trim()
            .required('* Required'),
    })
}

export const loginValidate = {
    initialState: { email: '', password: '' },
    schema: yup.object().shape({
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Required'),
        password: yup
            .string()
            .min(4)
            .trim()
            .required('* Required'),
    })
}

export const completeProfileValidate = {
    initialState: { education: '', experience: '', about: '' },
    schema: yup.object().shape({
        education: yup
            .string()
            .required('* Required'),
        experience: yup
            .string()
            .required('* Required'),
        about: yup
            .string()
            .required('* Required'),
    })
}

export const forgotValidate = {
    initialState: { email: '' },
    schema: yup.object().shape({
        email: yup
            .string()
            .email("Email must be a valid email")
            .required('* Required'),
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
    initialState: { first_name: '', last_name: '' },
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
            .required('Password is must be required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('new_password'), null], "Password must match")
            .trim()
            .required('Confirm password is must be required'),
    })
}
import * as yup from 'yup';

export const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/,
        'Must be at least 8 characters, containing a capital letter, a number and a symbol'
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('newPassword')], "Passwords don't match"),
  });
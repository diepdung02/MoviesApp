import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Bắt buộc nhập email').email().label('Email'),
  password: Yup.string().required('Bắt buộc nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 kí tự') .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một kí tự đặc biệt').label('Password')

});

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string().required('Bắt buộc nhập email').email().label('Email'),
  password: Yup.string().required('Bắt buộc nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 kí tự').label('Password').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một kí tự đặc biệt'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu phải trùng với mật khẩu')
  .required('Vui lòng xác nhận lại mật khẩu'),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .label('Email')
    .email('Enter a valid email')
});

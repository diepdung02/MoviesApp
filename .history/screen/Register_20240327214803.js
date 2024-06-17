import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Auth} from '../components';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleSignup = async values => {
    const {fullName, email, password, confirmPassword} = values;
    try {
      // Đăng kí người dùng trong Authentication
      await Auth.signUp(fullName, email, password, confirmPassword);

      // Lưu thông tin vào Firestore
      await firestore().collection('users').doc(email).set({
        fullName: fullName,
        email: email,
        // Thêm các trường thông tin khác của người dùng nếu cần
      });

      navigation.navigate('Login');
      Alert.alert('Đăng kí thành công');
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng ký');
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required('Vui lòng nhập họ và tên'),
        email: Yup.string()
          .email('Email không hợp lệ')
          .required('Vui lòng nhập email'),
        password: Yup.string()
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
          .required('Vui lòng nhập mật khẩu'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không khớp')
          .required('Vui lòng xác nhận mật khẩu'),
      })}
      onSubmit={values => handleSignup(values)}>
      {({values, touched, errors, handleChange, handleSubmit, handleBlur}) => (
        <View style={styles.container}>
          <Text style={styles.TextLogin}>Đăng kí</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Họ và tên"
              keyboardType="default"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
            />
          </View>

          {touched.fullName && errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
          </View>

          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              secureTextEntry={hidePassword}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={hidePassword ? 'eye-off' : 'eye'}
                color={'black'}
                size={25}
              />
            </TouchableOpacity>
          </View>

          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry={hidePassword}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={hidePassword ? 'eye-off' : 'eye'}
                color={'black'}
                size={25}
              />
            </TouchableOpacity>
          </View>

          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Đăng kí</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.TextRegister}>
              Đã có tài khoản? Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#97FFFF',
    padding: 20,
  },
  TextLogin: {
    fontSize: 30,
    color: '#0000FF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#0033FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  TextRegister: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
    fontWeight: '500',
  },
});

export default Register;

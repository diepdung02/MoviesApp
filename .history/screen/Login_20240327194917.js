import React, {useState, useEffect} from 'react';
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    // Kiểm tra xem mật khẩu đã được lưu trữ trong AsyncStorage hay không
    const checkRememberPassword = async () => {
      try {
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedPassword) {
          // Nếu có mật khẩu đã lưu, tự động điền vào TextInput và setRememberPassword(true)
          setPassword(savedPassword);
          setRememberPassword(true);
        }
      } catch (error) {
        console.error('Lỗi khi đọc mật khẩu từ AsyncStorage:', error);
      }
    };

    checkRememberPassword();
  }, []);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogin = async (values) => {
    const {email, password} = values;

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const currentUser = userCredential.user;

      if (currentUser) {
        const adminRef = firestore().collection('users').doc(currentUser.uid);
        const doc = await adminRef.get();

        if (doc.exists) {
          const userData = doc.data();
          const isAdmin = userData.isAdmin || false;

          if (isAdmin) {
            // Đăng nhập thành công với quyền admin, điều hướng đến trang admin
            Alert.alert('Đăng nhập thành công với quyền admin');
            console.log('Đăng nhập thành công với quyền admin');
            navigation.navigate('AdminScreen');
          } else {
            // Đăng nhập thành công nhưng không phải là admin, điều hướng đến trang người dùng thông thường
            Alert.alert('Đăng nhập thành công');
            console.log('Đăng nhập thành công');
            navigation.navigate('HomeScreen');
          }
        }
      }
    } catch (error) {
      Alert.alert('Email hoặc mật khẩu không chính xác');
      console.error('Lỗi khi đăng nhập:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => handleLogin(values)}>
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <View style={styles.container}>
          <Text style={styles.TextLogin}>Đăng nhập</Text>
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
              placeholder="Password"
              keyboardType="default"
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

          <View style={styles.Pass}>
            <View style={styles.rememberPassword}>
              <CheckBox
                value={rememberPassword}
                onValueChange={(newValue) => setRememberPassword(newValue)}
              />
              <Text style={styles.rememberPasswordText}>Lưu mật khẩu</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.TextQuenMk}>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonRegister}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.TextRegister}>Bạn chưa có tài khoản?</Text>
          </TouchableOpacity>

          <View style={styles.Line}>
            <View style={styles.horizontalLine} />
            <Text style={styles.centeredText}>Hoặc đăng nhập với</Text>
          </View>
          <View style={styles.social}>
            <TouchableOpacity style={styles.socialIcon} onPress={handleSubmit}>
              <Icon name={'facebook'} color={'blue'} size={50} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={handleSubmit}>
              <Icon name={'google-plus'} color={'red'} size={65} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={handleSubmit}>
              <Icon name={'gmail'} color={'black'} size={50} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#97FFFF',
  },
  loginButton: {
    backgroundColor: '#0033FF',
    width: 150,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
   

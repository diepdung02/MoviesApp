import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';

const Login = ({ navigation }) => {
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
    const { email, password } = values;

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const currentUser = userCredential.user;

      if (currentUser) {
        // Lấy thông tin người dùng từ Firestore
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();

        if (userDoc.exists) {
          // Nếu tài liệu người dùng tồn tại, điều hướng đến màn hình phù hợp
          navigation.navigate('HomeScreen');
        } else {
          // Nếu không tìm thấy tài liệu người dùng, thông báo lỗi
          Alert.alert('Không tìm thấy thông tin người dùng.');
        }
      }

      // Lưu mật khẩu vào AsyncStorage nếu người dùng đã chọn "Lưu mật khẩu"
      if (rememberPassword) {
        await AsyncStorage.setItem('password', password);
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

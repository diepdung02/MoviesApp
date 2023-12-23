import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Line,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {loginValidationSchema, signupValidationSchema} from '../utils';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Auth } from '../components';
import auth from '@react-native-firebase/auth';



const Register = ( {navigation} ) => {
  const[fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotpassword, setForgotPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideForgotPassword, setHideForgotPassword] = useState(true);
   const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');


  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const toggleForgotPasswordVisibility = () => {
    setHideForgotPassword(!hideForgotPassword);
  };

  const handleSignup = async (values) => {
    const {fullName, email, password, confirmPassword } = values;
    auth()
    .signInWithEmailAndPassword(fullName, email, password, confirmPassword )
    .then(() => navigation.navigate('Login'))
    .catch(error => {
      Alert.alert('Email và mật khẩu không chính xác');
    });
  };


  return (
    <Formik
    initialValues={{fullName, email: '', password: '', confirmPassword: '' }}
    validationSchema={Yup.object().concat( signupValidationSchema)}
    onSubmit={(values) => handleSignup(values)}>
    {({ 
       values,
       touched,
       errors,
       handleChange,
       handleSubmit,
       handleBlur,
       setSubmitting, }) => (
        <View style={styles.container}>
          <Text style={styles.TextLogin}>Đăng kí</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Họ tên"
              keyboardType='default'
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              keyboardType='default'
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
              keyboardType='default'
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

          <View style={styles.inputForgotPassword}>
            <TextInput
              style={styles.textForgotPassword}
              placeholder="Nhập lại mật khẩu"
              keyboardType='default'
              secureTextEntry={hideForgotPassword}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />
            <TouchableOpacity onPress={toggleForgotPasswordVisibility}>
              <Icon
                name={hideForgotPassword ? 'eye-off' : 'eye'}
                color={'black'}
                size={25}
              />
            </TouchableOpacity>
          </View>

          {touched.password && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
  <View style={styles.ButtonTk}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.TextRegister}>Đã có tài khoản</Text>
            </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.TextQuenMk}>Quên mật khẩu</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Đăng kí</Text>
          </TouchableOpacity>


          <View style={styles.Line}>
          <View style={styles.horizontalLine} />
            <Text style={styles.centeredText}>Hoặc đăng nhập với</Text>
          </View>
          <View style={styles.social}>
          <TouchableOpacity style={styles.socialIcon} onPress={handleSubmit}>
              <Icon
                name={'facebook'}
                color={'blue'}
                size={50}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={handleSubmit}>
              <Icon
                name={'google-plus'}
                color={'red'}
                size={65}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={handleSubmit}>
              <Icon
                name={'gmail'}
                color={'black'}
                size={50}
              />
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
    fontFamily:'Assets/fonts/Roboto-Black.ttf',
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    
  },
  TextLogin: {
    fontFamily:'Assets\fonts\HedvigLettersSerif_18pt-Regular.ttf',
    fontSize: 30,
    color: '#0000FF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 50,
  },
  errorText: {
    textAlign: 'center',
    alignContent: 'center',
    color: 'red',
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: '#ffff',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  TextQuenMk: {
    fontFamily:'Assets\fonts\Roboto-Regular.ttf',
    textAlign: 'right',
    marginRight: 10,
    color: '#000',
    fontWeight: '500',
  },

  horizontalLine: {
    width: '80%',
    height: 1,
    backgroundColor: '#000',
    justifyContent:'center',
    marginVertical: 20,
  },
  Line:{
    alignItems:'center'
  },
  centeredText:{
    marginTop: -30, 
    backgroundColor: '#97FFFF', 
    paddingHorizontal: 10, 
    color:'#000'
  },
  social:{
    marginLeft:25,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    
  },
  socialIcon:{
    marginRight:30,
  },  

  TextRegister:{
    fontFamily:'Assets\fonts\Roboto-Regular.ttf',
    textAlign: 'left',
    marginLeft: 10,
    color: '#000',
    fontWeight: '500',
  },
  inputForgotPassword:{
    backgroundColor: '#ffff',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ButtonTk:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
});

export default Register;

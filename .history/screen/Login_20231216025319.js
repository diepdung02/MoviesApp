import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {loginValidationSchema, passwordResetSchema} from '../utils';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import { Alert } from 'react-native';



const Login = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [ErrorState, setErrorState] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogin =async (values) => {
    const {email, password} = values;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('HomeScreen'))
      .catch(error => {
        Alert.alert('Email và mật khẩu không chính xác');
      });
  };
  
  return (
    <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={Yup.object().concat(loginValidationSchema)}
    onSubmit={(values) => (values)}>
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setSubmitting,
      }) => (
      
        <View style={styles.container}>
          <Text style={styles.TextLogin}>Đăng nhập</Text>
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
              placeholder="Password"
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
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
            >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonRegister}
            onPress={() => navigation.navigate('Register')}>
              <Text style={styles.TextRegister}>Bạn chưa có tài khoản?</Text>
          
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
    marginBottom: 80,
    marginTop: 80,
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
    textAlign: 'right',
    marginRight: 10,
    color: '#000',
    fontWeight: '500',
    flexDirection: 'row',
    alignItems: 'center',
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
  ButtonRegister:{
    alignItems:'center',
  },
  TextRegister:{
    fontSize:15,
    color:'#000',
    padding:15,
  },
  rememberPasswordText:{
    fontWeight:'500',
    color:'#000',
  },
  rememberPassword:{
    flexDirection: 'row',
    textAlign:'left',
    alignItems: 'center',
    bottom:7,
    fontWeight:'500'
  },
  Pass:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
  }
});

export default Login;

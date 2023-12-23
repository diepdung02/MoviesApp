import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const signUp =(fullname, email, password, comfirmpassword)

const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signOut,
};

export default Auth;

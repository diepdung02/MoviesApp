import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';



const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signOut,
};

export default Auth;

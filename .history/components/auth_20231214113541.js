import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const signUp =(fullname, email, password, comfirmpassword)



const signIn = (email, password) => {
  if (email && password && email.trim() && password.trim()) {
    return auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        console.log(auth().currentUser.uid);
      })
      .catch((err) => Alert.alert(err.code, err.message));
  } else {
    Alert.alert('Enter valid email and password');
  }
}; 

const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signOut,
};

export default Auth;

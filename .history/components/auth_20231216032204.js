import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const signUp = (fullName, email, password, confirmPassword) => {
  if (
    fullName && email && password && confirmPassword &&
    fullName.trim() && email.trim() && password.trim() && confirmPassword.trim()
  ) {
    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không trùng khớp');
      return;
    }

    return auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((userCredential) => {
        // Additional user information can be updated here if needed
        const user = userCredential.user;
        user.updateProfile({
          displayName: fullName.trim(),
        });
        console.log('Đã đăng kí thành công');
        navigation.navi
      })
      .catch((err) => {
        Alert.alert(err.code, err.message);
      });
  }
};




const signIn = (email, password) => {
  if (email && password && email.trim() && password.trim()) {
    return auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        console.log(auth().currentUser.uid);
      })
      .catch((err) => Alert.alert(err.code, err.message));
  } 
}; 

const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signOut,
  signIn,
  signUp,
};

export default Auth;

import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const signUp = (fullName, email, password, confirmPassword) => {
  if (
    fullName && email && password && confirmPassword &&
    fullName.trim() && email.trim() && password.trim() && confirmPassword.trim()
  ) {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
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
      })
      .catch((err) => {
        Alert.alert(err.code, err.message);
      });
  } else {
    Alert.alert('Vui lòng điền đầy đủ thong tin');
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
  } else {
    Alert.alert('Enter valid email and password');
  }
}; 

const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signOut,
  signIn,
  signUp
};

export default Auth;

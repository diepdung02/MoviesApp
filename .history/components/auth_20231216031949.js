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

    const handleSignup = async (values, navigation) => {
  const { fullName, email, password } = values;

  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password.trim());
    const user = userCredential.user;

    // Update additional user information if needed
    await user.updateProfile({
      displayName: fullName.trim(),
    });

    console.log('Đã đăng kí thành công');
    navigation.navigate('Login'); // Quay lại màn hình Login sau khi đăng ký thành công
  } catch (error) {
    Alert.alert(error.code, error.message);
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

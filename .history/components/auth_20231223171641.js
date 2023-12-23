import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const signUp = async (fullName, email, password, confirmPassword) => {
  try {
    if (
      fullName && email && password && confirmPassword &&
      fullName.trim() && email.trim() && password.trim() && confirmPassword.trim()
    ) {
      if (password !== confirmPassword) {
        Alert.alert('Mật khẩu không trùng khớp');
        return;
      }

      const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password.trim());

      if (userCredential) {
        const user = userCredential.user;

        // Thêm thông tin fullName vào Firestore
        await firestore().collection('users').doc(user.uid).set({
          fullName: fullName.trim(),
          // Các thông tin khác có thể được thêm ở đây nếu cần
        });

        // Cập nhật displayName trong profile của người dùng
        await user.updateProfile({
          displayName: fullName.trim(),
        });

        console.log('Đã đăng kí thành công');
      }
    }
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

const signOut = async () => {
  try {
    await auth().signOut();
    console.log('User signed out successfully');
  } catch (error) {
    Alert.alert('Sign Out Error', error.message);
    console.error('Sign Out Error:', error);
  }
};


const Auth = {
  signIn,
  signUp,
  signOut,
};

export default Auth;

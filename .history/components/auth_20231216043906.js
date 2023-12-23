import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const signUp = (fullName, email, password, confirmPassword) => {
  if (
    fullName && email && password && confirmPassword &&
    fullName.trim() && email.trim() && password.trim() && confirmPassword.trim()
  ) {
    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không trùng khớp');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then(async (userCredential) => {
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

        console.log('Đã đăng ký thành công');
      })
      .catch((err) => {
        Alert.alert(err.code, err.message);
      });
  }
};
const submitForm = () => {
  // Hàm này cần trả về một Promise, ví dụ:
  return new Promise((resolve, reject) => {
    // Logic xử lý
    if (/* Điều kiện thành công */) {
      resolve('Success');
    } else {
      reject('Error');
    }
  });
};

// Sử dụng hàm submitForm
submitForm()
  .then((result) => {
    // Xử lý kết quả thành công
    console.log(result);
  })
  .catch((error) => {
    // Xử lý lỗi
    console.error(error);
  });





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

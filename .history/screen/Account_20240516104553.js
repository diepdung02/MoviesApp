import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native'; 

const Account = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [avatar, setAvatar] = useState(null); // Khai báo biến state avatar và khởi tạo là null
  const [newPassword, setNewPassword] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const userEmail = currentUser.email;
          try {
            const userRef = await firebase.firestore().collection('users').where('email', '==', userEmail).get();
            if (!userRef.empty) {
              const userData = userRef.docs[0].data();
              setFullName(userData.fullName);
              setAvatar(userData.avatar); // Cập nhật giá trị của biến avatar từ dữ liệu người dùng
            } else {
              console.log('Không tìm thấy thông tin người dùng trong Firestore.');
            }
          } catch (error) {
            console.error('Lỗi khi truy vấn Firestore:', error);
          }
        }
      };

      fetchUserData();
    }, []),
  );

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng xuất.');
    }
  };

  const handleUpdateName = async () => {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      console.error('Không tìm thấy người dùng đã xác thực.');
      return;
    }

    if (!newFullName || newFullName.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập tên mới.');
      return;
    }

    if (newFullName.trim() === fullName) {
      Alert.alert('Lưu ý', 'Tên mới trùng với tên hiện tại.');
      return;
    }

    try {
      await currentUser.updateProfile({
        displayName: newFullName.trim(),
      });

      const userRef = await firebase.firestore().collection('users').where('email', '==', currentUser.email).get();

      if (!userRef.empty) {
        await userRef.docs[0].ref.update({fullName: newFullName.trim()});
        setFullName(newFullName.trim());
        setNewFullName('');
        Alert.alert('Thông báo', 'Cập nhật tên thành công.');
      } else {
        console.log('Không tìm thấy thông tin người dùng trong Firestore.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật tên:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật tên.');
    }
  };

  const handleUpdateAvatar = async () => {
    // Implement logic to update avatar here
    // You can use a library like react-native-image-picker to select an image from gallery or camera
    // and then upload it to Firebase Storage, then update the user's avatar URL in Firebase Auth and Firestore
  };

  const handleChangePassword = async () => {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      console.error('Không tìm thấy người dùng đã xác thực.');
      return;
    }

    if (!newPassword || newPassword.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu mới.');
      return;
    }

    try {
      await currentUser.updatePassword(newPassword.trim());
      Alert.alert('Thông báo', 'Đổi mật khẩu thành công.');
      setNewPassword('');
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đổi mật khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountWelcome}>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={{uri: avatar}} // Sử dụng giá trị của biến avatar để hiển thị ảnh đại diện
          />
        </TouchableOpacity>
        <Text>{`Xin chào, ${fullName}`}</Text>
      </View>

      <View style={styles.accountItem}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên mới"
          value={newFullName}
          onChangeText={text => setNewFullName(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
          <Text style={styles.buttonText}>Cập nhật tên</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.accountItem}>
        <Text style={styles.itemText}>Xem Hồ Sơ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate('MyTicketsScreen')}>
        <Text style={styles.itemText}>Vé Của Tôi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountItem}>
        <Text style={styles.itemText}>Cài Đặt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountItem}>
        <Text style={styles.itemText}>Trung Tâm Hỗ Trợ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.accountItem} onPress={handleUpdateAvatar}>
        <Text style={styles.itemText}>Cập nhật ảnh đại diện</Text>
      </TouchableOpacity>

      <View style={styles.accountItem}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
        <Text style={styles.logoutText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  accountWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  accountItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  logout: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Account;

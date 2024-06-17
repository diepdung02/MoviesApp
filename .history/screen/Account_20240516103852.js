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

      <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
        <Text style={styles.logoutText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>

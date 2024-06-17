import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    // Load user profile data when component mounts
    const currentUser = auth().currentUser;
    if (currentUser) {
      setFullName(currentUser.displayName);
      setAvatar(currentUser.photoURL);
    }
  }, []);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setAvatar(source);
        try {
          // Upload the selected image to Firebase Storage
          const filename = `avatar_${auth().currentUser.uid}.jpg`;
          const uploadUri = Platform.OS === 'ios' ? source.replace('file://', '') : source;
          const task = storage().ref(filename).putFile(uploadUri);

          await task;
          const url = await storage().ref(filename).getDownloadURL();

          // Update user profile with new avatar URL
          await auth().currentUser.updateProfile({
            photoURL: url,
          });
        } catch (error) {
          console.error('Lỗi tải ảnh lên:', error);
          Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải ảnh lên.');
        }
      }
    });
  };

  const handleChangeFullName = async () => {
    try {
      await auth().currentUser.updateProfile({
        displayName: fullName,
      });
      Alert.alert('Thành công', 'Tên của bạn đã được cập nhật thành công.');
    } catch (error) {
      console.error('Lỗi cập nhật tên đầy đủ:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật tên đầy đủ của bạn.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await auth().currentUser.delete();
      // Redirect to login screen or any other action after successful account deletion
      Alert.alert('Thành công', 'Tài khoản của bạn đã được xóa thành công.');
    } catch (error) {
      console.error('Lỗi xóa tài khoản:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa tài khoản của bạn.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hồ sơ người dùng</Text>
      {avatar ? <Image source={{ uri: avatar }} style={styles.avatar} /> : null}
      <Button title="Chọn ảnh" onPress={handleSelectImage} />
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <Button title="Cập nhật tên" onPress={handleChangeFullName} />
      <Button title="Xóa tài khoản" onPress={handleDeleteAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Profile;

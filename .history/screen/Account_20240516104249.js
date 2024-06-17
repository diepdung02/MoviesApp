import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Profile from './Profile';
import auth from '@react-native-firebase/auth'; // Import auth from firebase

const Account = () => {
  const [avatar, setAvatar] = useState('');

  // Callback function to update avatar in Account component
  const handleAvatarChange = newAvatar => {
    setAvatar(newAvatar);
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut(); // Sign out the user
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tài khoản</Text>
      {avatar ? <Image source={{ uri: avatar }} style={styles.avatar} /> : null}
      <Profile onAvatarChange={handleAvatarChange} />
      <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
        <Text style={styles.logoutText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logout: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Account;

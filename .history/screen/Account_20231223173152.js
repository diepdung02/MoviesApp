import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Auth } from '../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AddMovies from '../components/Firestore';

const Account = ({navigation}) => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const { fullName } = userDoc.data();
          setFullName(fullName);
        }
      }
    };

    fetchFullName();
  }, []);

  const handleSignOut = async () => {
    await Auth.signOut();
    navigation.navigate('Login'); // Navigate to the 'Login' screen after sign-out
  };
  return (
    <View style={styles.container}>
      {/* View xin chào account */}
      <View style={styles.accountWelcome}>
        <Image
          style={styles.avatar}
          source={require('../assets/image/QB.jpg')}
        />
         <Text>{`Xin chào, ${fullName}`}</Text>
      </View>

      {/* Các view cho từng mục trong tài khoản */}
      <TouchableOpacity style={styles.accountItem}>
        <Text style={styles.itemText}>Xem Hồ Sơ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountItem}>
        <Text style={styles.itemText}>Thẻ Của Tôi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountItem}>
        <Text style={styles.itemText}>Cài Đặt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountItem}>
        <Text style={styles.itemText}>Trung Tâm Hỗ Trợ</Text>
      </TouchableOpacity>

      {/* View Đăng xuất */}
      <TouchableOpacity style={styles.logout} onPress=>
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
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
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

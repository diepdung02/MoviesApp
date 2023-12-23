import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Auth } from '../components';

const Account = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* View xin chào account */}
      <View style={styles.accountWelcome}>
        <Image
          style={styles.avatar}
          source={require('../assets/image/QB.jpg')}
        />
        <Text style={styles.welcomeText}>{}</Text>
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
      <TouchableOpacity style={styles.logout} onPress={() => Auth.signOut()}>
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

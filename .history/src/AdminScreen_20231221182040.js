// Import các thư viện và component cần thiết từ React Native
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Component Dashboard
const DashboardScreen = ({ navigation }) => {
  const [adminInfo, setAdminInfo] = useState({});

  // Hàm để lấy thông tin quản trị viên
  const fetchAdminInfo = async () => {
    try {
      // Gọi API để lấy thông tin quản trị viên từ backend
      // Ví dụ: const response = await fetch('URL_API/admin');
      // const data = await response.json();
      // setAdminInfo(data);
      // Trong ví dụ này, chúng ta sẽ giả định dữ liệu nhận được từ API là một đối tượng adminInfo
      const adminInfo = {
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
      };
      setAdminInfo(adminInfo);
    } catch (error) {
      console.error('Error fetching admin info: ', error);
    }
  };

  // Sử dụng useEffect để gọi hàm fetchAdminInfo khi component được mount
  useEffect(() => {
    fetchAdminInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <View style={styles.infoContainer}>
        <Text>Username: {adminInfo.username}</Text>
        <Text>Email: {adminInfo.email}</Text>
        <Text>Role: {adminInfo.role}</Text>
      </View>
      <Button title="Manage Movies" onPress={() => navigation.navigate('ManageMovies')} />
      <Button title="Manage Users" onPress={() => navigation.navigate('ManageUsers')} />
      <Button title="Logout" onPress={() => alert('Logout')} />
    </View>
  );
};

// Component ManageMovies
const ManageMoviesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Movies</Text>
      {/* Hiển thị danh sách phim và các chức năng quản lý phim */}
    </View>
  );
};

// Component ManageUsers
const ManageUsersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Users</Text>
      {/* Hiển thị danh sách người dùng và các chức năng quản lý người dùng */}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
});

export { DashboardScreen, ManageMoviesScreen, ManageUsersScreen };

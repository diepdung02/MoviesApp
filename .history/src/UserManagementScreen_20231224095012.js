// UserManagementScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import auth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // Người dùng đã đăng nhập, lấy danh sách người dùng từ Firestore
        const usersRef = firestore().collection('users');

        usersRef.onSnapshot(querySnapshot => {
          const userList = [];
          querySnapshot.forEach(doc => {
            userList.push({ id: doc.id, ...doc.data() });
          });
          setUsers(userList);
          setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteUser = (userId) => {
    // Xóa người dùng từ Firestore
    firestore()
      .collection('users')
      .doc(userId)
      .delete()
      .then(() => {
        console.log('User deleted!');
      })
      .catch(error => {
        console.error('Error removing user: ', error);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>User Management Screen</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>{item.email}</Text>
            <Button
              title="Delete"
              onPress={() => handleDeleteUser(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default UserManagementScreen;

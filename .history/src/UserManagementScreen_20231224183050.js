import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);

  // Lấy dữ liệu người dùng từ Firestore khi màn hình được tạo
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((documentSnapshot) => {
          usersList.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setUsers(usersList);
      });

    // Dừng lắng nghe khi màn hình bị hủy
    return () => subscriber();
  }, []);

  const handleDeleteUser = (userId) => {
    firestore().collection('users').doc(userId).delete();
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text>{item.email}</Text>
      <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserManagementScreen;

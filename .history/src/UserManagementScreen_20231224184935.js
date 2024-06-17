import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [adminEmail, setAdminEmail] = useState('');

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

    return () => subscriber();
  }, []);

  const handleDeleteUser = (userId) => {
    firestore().collection('users').doc(userId).delete();
  };

  const handleAddAdmin = () => {
    if (adminEmail.trim() !== '') {
      firestore().collection('admins').add({ email: adminEmail });
      setAdminEmail('');
    }
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
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
        <TextInput
          placeholder="Admin email"
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
          value={adminEmail}
          onChangeText={setAdminEmail}
        />
        <Button title="Add Admin" onPress={handleAddAdmin} />
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserManagementScreen;

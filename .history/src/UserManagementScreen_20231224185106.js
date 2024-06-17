import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

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

  const handleAddAdmin = async () => {
    try {
      const authUser = await auth().createUserWithEmailAndPassword(adminEmail, adminPassword);
      const { uid, email } = authUser.user;
      
      await firestore().collection('users').doc(uid).set({ email, isAdmin });
      setAdminEmail('');
      setAdminPassword('');
      setIsAdmin(false);
    } catch (error) {
      console.error('Error creating admin:', error);
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
        <TextInput
          placeholder="Admin password"
          secureTextEntry
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginLeft: 10 }}
          value={adminPassword}
          onChangeText={setAdminPassword}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          <Text>Is Admin?</Text>
          <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)} style={{ marginLeft: 5 }}>
            <Text>{isAdmin ? 'Yes' : 'No'}</Text>
          </TouchableOpacity>
        </View>
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

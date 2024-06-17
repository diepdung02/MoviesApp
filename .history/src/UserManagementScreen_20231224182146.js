import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(snapshot => {
      const userData = [];
      snapshot.forEach(doc => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userData);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await db.collection('users').doc(userId).delete();
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text>{item.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => handleEditUser(item.id)}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddUser = async () => {
    try {
      const newUser = {
        name: 'New User', // Replace 'New User' with the new user's information
        // Add other user information as needed
      };
      await db.collection('users').add(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={handleAddUser}>
        <Text>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserManagementScreen;

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Auth} from '../components';
import firestore from '@react-native-firebase/firestore';
import AddMovies from '../components/Firestore';
import {NavigationContainer} from '@react-navigation/native';
import {ViewPropTypes} from 'react-native';
import DrawerNavigator from '../src';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MovieManagementScreen, ShowtimeManagementScreen, UserManagementScreen} from '../src'
const AdminScreen = () => {
  const [movies, setMovies] = useState([]);
  const [fullName, setFullName] = useState('');

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MovieManagement">
        <Drawer.Screen name="AdminScreen" component={MovieManagementScreen} />
        <Drawer.Screen
          name="MovieManagement"
          component={MovieManagementScreen}
        />
        <Drawer.Screen
          name="ShowtimeManagement"
          component={ShowtimeManagementScreen}
        />
        <Drawer.Screen name="UserManagement" component={UserManagementScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
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

export default AdminScreen;

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ManageMoviesScreen, ManageShowtimesScreen, ManageUsersScreen } from '../'; // Import các màn hình chức năng

const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ManageMovies">
        <Drawer.Screen name="ManageMovies" component={ManageMoviesScreen} options={{ title: 'Quản lý Phim' }} />
        <Drawer.Screen name="ManageShowtimes" component={ManageShowtimesScreen} options={{ title: 'Quản lý Suất Chiếu' }} />
        <Drawer.Screen name="ManageUsers" component={ManageUsersScreen} options={{ title: 'Quản lý Người Dùng' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AdminDrawer;

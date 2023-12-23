import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MovieManagementScreen, ShowtimeManagementScreen, UserManagementScreen } from '../src'; 

const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  return (
    <>
      <Drawer.Navigator initialRouteName="ManageMovies">
        <Drawer.Screen name="ManageMovies" component={MovieManagementScreen} options={{ title: 'Quản lý Phim' }} />
        <Drawer.Screen name="ManageShowtimes" component={ShowtimeManagementScreen} options={{ title: 'Quản lý Suất Chiếu' }} />
        <Drawer.Screen name="ManageUsers" component={UserManagementScreen} options={{ title: 'Quản lý Người Dùng' }} />
      </Drawer.Navigator>
    </>
  );
};

export default AdminDrawer;

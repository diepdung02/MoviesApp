import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MovieManagementScreen, ManageShowtimesScreen, ManageUsersScreen } from '../'; 

const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ManageMovies">
        <Drawer.Screen name="ManageMovies" component={MovieManagementScreen} options={{ title: 'Quản lý Phim' }} />
        <Drawer.Screen name="ManageShowtimes" component={ManageShowtimesScreen} options={{ title: 'Quản lý Suất Chiếu' }} />
        <Drawer.Screen name="ManageUsers" component={ManageUsersScreen} options={{ title: 'Quản lý Người Dùng' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AdminDrawer;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Login, Register, ForgotPassword, Account, HomeScreen, MovieDetailScreen, NowShowingScreen, BookingScreen, PaymentScreen } from '../';
import { MovieManagementScreen, ShowtimeManagementScreen, UserManagementScreen } from '../src';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="AdminScreen" component={AdminDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AdminDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="ManageMovies">
      <Drawer.Screen name="ManageMovies" component={MovieManagementScreen} options={{ title: 'Quản lý Phim' }} />
      <Drawer.Screen name="ManageShowtimes" component={ShowtimeManagementScreen} options={{ title: 'Quản lý Suất Chiếu' }} />
      <Drawer.Screen name="ManageUsers" component={UserManagementScreen} options={{ title: 'Quản lý Người Dùng' }} />
    </Drawer.Navigator>
  );
};

export default AuthNavigation;

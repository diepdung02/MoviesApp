import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Login,
  Register,
  ForgotPassword,
  Account,
  HomeScreen,
  MovieDetailScreen,
  NowShowingScreen,
  BookingScreen,
  PaymentScreen,
} from '../screen';
import {
  AdminScreen,
  MovieManagementScreen,
  ShowtimeManagementScreen,
  UserManagementScreen,
} from '../src';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AdminDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Admin" component={AdminScreen} />
    <Drawer.Screen name="MovieManagement" component={MovieManagementScreen} />
    <Drawer.Screen name="ShowtimeManagement" component={ShowtimeManagementScreen} />
    <Drawer.Screen name="UserManagement" component={UserManagementScreen} />
  </Drawer.Navigator>
);

const AuthNavigation = () => {
  return (
    
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
}

export default AuthNavigation;
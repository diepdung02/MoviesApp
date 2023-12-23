import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, MovieDetailScreen, NowShowingScreen, BookingScreen, PaymentScreen } from '../screen';
import { AdminScreen } from '../src';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
    </Stack.Navigator>
  );
};

export default MainNav;

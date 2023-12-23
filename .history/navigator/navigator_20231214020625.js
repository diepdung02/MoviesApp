import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../Screen/index';
import {Account} from '../Screen'
import {SearchScreen} from '../Screen'
import {RoomBookingScreen} from '../Screen'

const Stack = createNativeStackNavigator();

const MainNav= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="RoomBookingScreen" component={RoomBookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNav;

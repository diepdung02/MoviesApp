import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../Screen/index';
import {Account} from '../Screen'
import Login from ',//'


const Stack = createNativeStackNavigator();

const MainNav= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Account" component={Account} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNav;
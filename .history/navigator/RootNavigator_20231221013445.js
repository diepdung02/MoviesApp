// Trong RootNavigator
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';
import MainNav from './';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainNav" component={MainNav} /> {/* Đảm bảo rằng MainNav nằm trong một Screen của Navigator */}
        {/* Các màn hình khác nếu cần */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

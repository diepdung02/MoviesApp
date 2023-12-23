import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screen/index';
import {Account} from '../screen'
import {Login} from '../screen'
import {ForgotPassword} from '../screen'


const Stack = createNativeStackNavigator();

const MainNav= () => {
  return (
    <NavigationContainer>
      <AccountStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </AccountStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

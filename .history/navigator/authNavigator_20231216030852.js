import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, ForgotPassword, Account, HomeScreen} from '../screen';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
         {/* <Stack.Screen name="Account" component={Account} />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;

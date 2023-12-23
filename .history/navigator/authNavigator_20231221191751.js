import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, ForgotPassword, Account, HomeScreen, MovieDetailScreen, NowShowingScreen} from '../screen';
import {BookingScreen} from '../screen'
import {PaymentScreen} from '../screen'
import {AdminScreen, S} from '../src'



const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;

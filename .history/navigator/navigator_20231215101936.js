import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screen/index';
import {Account} from '../screen'
import {Login} from '../screen'
import {ForgotPassword} from '../screen'
import HomeStack from '../components/HomeStack';


const Stack = createNativeStackNavigator();

const MainNav= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

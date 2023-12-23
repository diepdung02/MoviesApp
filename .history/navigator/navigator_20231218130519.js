import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screen/index';
import {Account} from '../screen'
import {Login} from '../screen'
import {ForgotPassword} from '../screen'
import {Register} from '../screen'
import {NowShowingScreen} from '../screen'import {NowShowingScreen} from '../screen'


const Stack = createNativeStackNavigator();

const MainNav= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

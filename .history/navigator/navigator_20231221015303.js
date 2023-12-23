
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Account, NowShowingScreen, MovieDetailScreen, BookingScreen, PaymentScreen,} from '../screen';
import { AdminScreen } from '../src'
const Stack = createNativeStackNavigator();

const MainNav = () => {
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
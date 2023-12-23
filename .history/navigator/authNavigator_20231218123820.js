import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, ForgotPassword, Account, HomeScreen, MovieDetailScreen} from '../screen';
import NowShowingScreen from '../components/NowShowingScreen';
import TrendingMovies from '../components/TrendingMovies';
import UpcomingScreen from '../components/UpcomingScreen';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
        <Stack.Screen name="TrendingMovies" component={TrendingMovies} />
        <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;

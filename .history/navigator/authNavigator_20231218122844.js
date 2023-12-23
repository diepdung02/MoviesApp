import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register, ForgotPassword, Account, HomeScreen, MovieDetailScreen } from '../screen';
import NowShowingScreen from '../components/NowShowingScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
        <Stack.Screen
          name="NowShowingScreen"
          options={({ navigation }) => ({
            headerShown: false,
            headerLeft: null,
            title: 'Now Showing',
            gestureEnabled: false,
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: 'white',
          })}
        >
          {props => <NowShowingScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;

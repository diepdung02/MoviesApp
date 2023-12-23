import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register, ForgotPassword, HomeScreen, MovieDetailScreen, NowShowingScreen, BookingScreen, PaymentScreen } from '../screen';
import { AdminScreen } from '../src';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {user.isAdmin ? (
              <Stack.Screen name="AdminScreen" component={AdminScreen} />
            ) : (
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
            )}
            {/* Các màn hình khác */}
            <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
            <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
            <Stack.Screen name="BookingScreen" component={BookingScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            {/* Các màn hình khác */}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Account, NowShowingScreen, MovieDetailScreen, BookingScreen, PaymentScreen } from '../screen';
import { AdminScreen } from '../src';
import Login from '../screen/Login';
import Register from '../screen/Register';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
            <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
            <Stack.Screen name="BookingScreen" component={BookingScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            {user.isAdmin ? <Stack.Screen name="AdminScreen" component={AdminScreen} /> : null}
            <Stack.Screen name="Account" component={Account} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {(props) => <Register {...props} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

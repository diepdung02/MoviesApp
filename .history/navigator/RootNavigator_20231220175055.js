// RootNavigator
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from './navigator';
import AuthNavigation from './authNavigator';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? <Stack.Screen name="Main" component={MainNav} /> : <Stack.Screen name="Auth" component={AuthNavigation} />}
    </Stack.Navigator>
  );
};

export default RootNavigator;

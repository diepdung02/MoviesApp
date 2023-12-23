import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from './navigator';
import AuthNavigation from './authNavigator';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribeAuth();
  }, []);

  function onAuthStateChanged(currentUser) {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? <Stack.Screen name="Main" component={MainNav} /> : <Stack.Screen name="Auth" component={AuthNavigation} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

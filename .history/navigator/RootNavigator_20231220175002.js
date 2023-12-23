import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './navigator';
import AuthNavigation from './authNavigator';
import auth from '@react-native-firebase/auth';

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
    <NavigationContainer>
      {user ? <MainNav /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigator;

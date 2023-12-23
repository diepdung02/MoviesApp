import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './navigator';
import AuthNavigation from './authNavigator';
import auth from '@react-native-firebase/auth';

const R = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <>
      {user ? <MainNav /> : <AuthNavigation />}
    </>
  );
};

export default AppContainer;

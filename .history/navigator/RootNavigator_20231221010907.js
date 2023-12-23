import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './navigator';
import AuthNavigator from './authNavigator';
import auth from '@react-native-firebase/auth';

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [users, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(currentUser) {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <>
      {user ? <MainNav user={user} /> : <AuthNavigator />}
    </>
  );
};

export default RootNavigator;

// RootNavigator.js
import React, { useState, useEffect } from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import auth from '@react-native-firebase/auth';

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

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
      {user ? (
        // Người dùng đã đăng nhập, chuyển hướng đến MainNavigator
        <MainNavigator user={user} />
      ) : (
        // Người dùng chưa đăng nhập, hiển thị AuthNavigator
        <AuthNavigator />
      )}
    </>
  );
};

export default RootNavigator;

// RootNavigator.js
import React, { useState, useEffect } from 'react';
import AuthNavigator from './authNavigator';
import MainNavigator from './';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

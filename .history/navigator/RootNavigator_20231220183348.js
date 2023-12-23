import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './navigator';
import AuthNavigation from './authNavigator';
import auth from '@react-native-firebase/auth';

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Thêm biến trạng thái mới

  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  useEffect(() => {
    // Kiểm tra nếu user đã đăng nhập, thì đặt isAuthenticated thành true
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  if (initializing) return null;

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <MainNav /> : <AuthNavigation />}
      
    </>
  );
};

export default RootNavigator;

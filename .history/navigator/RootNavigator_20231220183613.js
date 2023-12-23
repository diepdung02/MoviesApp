import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNav from './navigator';
import AdminNav from './adminNavigator'; // Thêm import cho màn hình admin
import AuthNavigation from './authNavigator';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false); // Thêm biến để kiểm tra quyền admin

  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  useEffect(() => {
    // Kiểm tra và đặt quyền admin nếu có
    if (user) {
      // Ví dụ: kiểm tra role hoặc thông tin khác của user để xác định quyền admin
      const isAdminUser = checkAdminRole(user); // Hàm kiểm tra quyền admin
      setIsAdmin(isAdminUser);
    }
  }, [user]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Kiểm tra và điều hướng đến màn hình phù hợp với vai trò của user
          isAdmin ? (
            <Stack.Screen name="Admin" component={AdminNav} />
          ) : (
            <Stack.Screen name="Main" component={MainNav} />
          )
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Hàm kiểm tra quyền admin, bạn cần thay đổi logic này dựa trên cách xác định quyền admin trong ứng dụng của bạn
const checkAdminRole = (user) => {
  // Thực hiện kiểm tra quyền admin dựa trên thông tin của user
  // Ví dụ: user có một trường thông tin role là 'admin' hoặc một cách khác để xác định quyền admin
  // Trả về true nếu user có quyền admin, ngược lại trả về false
  return user.role === 'admin';
};

export default RootNavigator;

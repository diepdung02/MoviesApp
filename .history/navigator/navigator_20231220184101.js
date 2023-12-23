import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Account, NowShowingScreen, MovieDetailScreen, BookingScreen, PaymentScreen } from '../screen';
import { AdminScreen } from '../src';
import Login from '../screen/Login';
import Register from '../screen/Register';
import ForgotPassword from '../screen/ForgotPassword';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const onRegisterSuccess = () => {
    // Xử lý khi đăng ký thành công, chuyển hướng đến màn hình đăng nhập
    Ví dụ: navigation.navigate('Login');
  };

  const onLoginSuccess = (user) => {
    // Xử lý khi đăng nhập thành công
    // Kiểm tra nếu người dùng có quyền admin
    setIsAdmin(user.isAdmin); // Giả sử thông tin về quyền admin được lưu trong user.isAdmin
    if (user.isAdmin) {
      // Nếu là admin, chuyển hướng đến màn hình admin
    navigation.navigate('AdminScreen');
    } else {
      // Nếu không phải admin, chuyển hướng đến màn hình chính (HomeScreen)
      // Ví dụ: navigation.navigate('HomeScreen');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onLoginSuccess={onLoginSuccess} />}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <Register {...props} onRegisterSuccess={onRegisterSuccess} />}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

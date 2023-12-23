import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screen/index';
import {Account} from '../screen'
import {BookingScreen} from '../screen'
import {NowShowingScreen} from '../screen'
import {MovieDetailScreen} from '../screen'
import {PaymentScreen} from '../screen'
import {AdminScreen} from '../src'
import {A}


const Stack = createNativeStackNavigator();
const [isLoggedIn, setIsLoggedIn] = useState(false); // State để kiểm tra trạng thái đăng nhập

useEffect(() => {
  // Kiểm tra nếu người dùng đã đăng nhập (có thể dựa vào thông tin của AuthContext, AsyncStorage, hoặc Redux...)
  const userLoggedIn = true; // Thay thế bằng logic kiểm tra đăng nhập thực tế của bạn
  setIsLoggedIn(userLoggedIn);
}, []);

const MainNav= () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="NowShowingScreen" component={NowShowingScreen} />
          <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
          <Stack.Screen name="BookingScreen" component={BookingScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthNavigation} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default MainNav;

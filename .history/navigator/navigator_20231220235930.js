// MainNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Account, HomeScreen,MovieDetailScreen,NowShowingScreen,BookingScreen,PaymentScreen} from '../screen';
import 

const Stack = createNativeStackNavigator();

const MainNavigator = ({ user }) => {
  return (
    <Stack.Navigator>
      {user.isAdmin ? (
        // Người dùng là admin, hiển thị màn hình Admin
        <Stack.Screen name="Admin" component={AdminScreen} />
      ) : (
        // Người dùng không phải admin, hiển thị các màn hình khác
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          {/* Thêm các màn hình khác nếu cần */}
          <Stack.Screen name="OtherScreens" component={OtherScreens} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

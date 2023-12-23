
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Account, HomeScreen,MovieDetailScreen,NowShowingScreen,BookingScreen,PaymentScreen} from '../screen';
import {AdminScreen} from '../src'

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
          <Stack.Screen name="Account" component={Account} />
          {/* Thêm các màn hình khác nếu cần */}
          <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
          <Stack.Screen name="BookingScreen" component={BookingScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />


        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

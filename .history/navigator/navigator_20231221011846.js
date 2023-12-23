import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screen/index';
import { Account } from '../screen';
import { NowShowingScreen } from '../screen';
import { MovieDetailScreen } from '../screen';
import { BookingScreen } from '../screen';
import { PaymentScreen } from '../screen';
import { AdminScreen } from '../src';

const Stack = createNativeStackNavigator();


const MainNav = ({ user }) => {
  console.log(user?.isAdmin); // Sử dụng optional chaining để kiểm tra user có tồn tại và có thuộc tính isAdmin không

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user?.isAdmin ? (
          <Stack.Screen name="Admin" component={AdminScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Account" component={Account} />
            {/* Thêm các màn hình khác nếu cần */}
            <Stack.Screen name="NowShowing" component={NowShowingScreen} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

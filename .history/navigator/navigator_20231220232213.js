import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Account, NowShowingScreen, MovieDetailScreen, BookingScreen, PaymentScreen, Login} from '../screen';
import { AdminScreen } from '../src';
import auth from '@react-native-firebase/auth';
 // Import LoginScreen từ đúng đường dẫn của bạn

const Stack = createNativeStackNavigator();

const MainNav = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {user.isAdmin ? (
              <Stack.Screen name="Admin" component={AdminScreen} />
            ) : (
              <Stack.Screen name="Home" component={HomeScreen} />
            )}
            {/* Các màn hình khác */}
            <Stack.Screen name="NowShowing" component={NowShowingScreen} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Account" component={Account} />
            {/* Các màn hình khác */}
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

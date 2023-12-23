// MainNav.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Account, NowShowingScreen, MovieDetailScreen, BookingScreen, PaymentScreen } from '../screen';
import { AdminScreen } from '../src';

const Stack = createNativeStackNavigator();

const MainNav = ({ navigation, route }) => {
  const { user } = route.params || {};

  return (
    <Stack.Navigator>
    
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="NowShowing" component={NowShowingScreen} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNav;

// HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import NowShowingScreen from './NowShowingScreen';
import UpcomingScreen from './UpcomingScreen';
import T

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NowShowing" component={NowShowingScreen} />
      <Stack.Screen name="Upcoming" component={UpcomingScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';

const Stack = createStackNavigator();

const  Hoem = ()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Movie App' }}
        />
        {/* Các màn hình khác có thể được thêm vào đây */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

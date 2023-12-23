import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from './MainNav';
import AuthNav from './AuthNav';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainNav} />
        <Stack.Screen name="Auth" component={AuthNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

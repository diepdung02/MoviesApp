
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './na'; // Đây là tên đường dẫn thực tế của RootNavigator của bạn

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;

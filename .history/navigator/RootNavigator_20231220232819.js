import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './navigator';
import AuthNavigation from './authNavigator';
import auth from '@react-native-firebase/auth';

const RootNavigator = () => {
  

  return (
    <>
       <MainNav /> : <AuthNavigation />}
    </>
  );
};

export default RootNavigator;

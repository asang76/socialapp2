import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import LandingPage from './src/Components/auth/LandingPage';
import Signup from './src/Components/auth/Signup';
import Login from './src/Components/auth/Login';
import BottomTabNavigator from './src/Components/BottomTabNavigator';
import ProfilePage from './src/pages/ProfilePage';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn,"isLoggedInisLoggedInisLoggedIn")

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedInStatus = await SecureStore.getItemAsync('isLoggedIn');
      console.log(loggedInStatus,"isLoggedInisLoggedInisLoggedIn")
      setIsLoggedIn(loggedInStatus === 'true');
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'BottomTabNavigator' : 'Landing'}>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

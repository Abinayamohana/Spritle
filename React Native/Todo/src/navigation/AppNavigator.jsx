// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TodoListScreen from '../screens/TodoListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AppContext } from '../context/AppContext';

import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="TodoList" component={TodoListScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

          </>
        )}
      </Stack.Navigator>
        <Toast />
    </NavigationContainer>
  );
}

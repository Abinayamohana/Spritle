// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TodoListScreen from '../screens/TodoListScreen';
import AddEditTodoScreen from '../screens/AddEditTodoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AppContext } from '../context/AppContext';


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
            <Stack.Screen name="AddEditTodo" component={AddEditTodoScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

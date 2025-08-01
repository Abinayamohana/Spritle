// App.js
import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />

    </AppProvider>
  );
}

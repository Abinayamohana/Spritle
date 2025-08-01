import React, { useContext } from 'react';
import { View, Button, TextInput, Alert, Image } from 'react-native';
import global from '../styles/global'
import { Formik } from 'formik';
import { AppContext } from '../context/AppContext';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';

// Login screen component
export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  // Access the context to get the loginUser function
  const { loginUser } = useContext(AppContext);

  return (
     // Formik handles form state and submission
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        // Attempt login with provided credentials
        const success = await loginUser(values.email, values.password);
        if (success) {
          Alert.alert('Login Successful', 'Welcome!');
          navigation.replace('TodoList'); //  Navigate to TodoList on success
        } else {
          Alert.alert('Invalid Credentials', 'Please check your email or password');
        }
      }}      
    >
      {( props ) => (

        // KeyboardAvoidingView for better keyboard handling on mobile
        <KeyboardAvoidingView 
          style={{flex:1}}
          behavior={Platform.OS === 'ios' ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}>
        <ScrollView
        // contentContainerStyle={global.scrollContainer}
        keyboardShouldPersistTaps="handled" // Allows tapping outside to dismiss keyboard
        >
        <View style={global.container}>
          <View style={global.formBox}>
          <Image source={require('../../assets/loginLogo.png')} 
            style={global.logoImage} />

          <Text style={global.heading}>Welcome Back !</Text>
          {/* Email input */}
          <TextInput
            style={global.input}
            placeholder="Email"
            value={props.values.email}
            onChangeText={props.handleChange('email')}
          />
          {/* Password input with show/hide toggle */}
          <View style={global.inputContainer}>
          <TextInput
            style={global.inputBox}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={props.values.password}
            onChangeText={props.handleChange('password')}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
          </View>
          {/* Login button */}
          <Button
          title="Login"
          onPress={props.handleSubmit}
          color="#2196F3"
          />
          {/* Link to registration screen */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={global.linkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>

      )}
    </Formik>

  );
}


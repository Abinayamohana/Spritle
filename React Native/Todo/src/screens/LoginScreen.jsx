import React, { useContext } from 'react';
import { View, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import global from '../styles/global'
import { Formik } from 'formik';
import { AppContext } from '../context/AppContext';
import { TouchableOpacity, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

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
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
            text2: 'Welcome back!',
            position: 'top',
            visibilityTime: 3000,
            text1Style: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000'
            },
            text2Style: {
              fontSize:14,
              color: '#6200ee'
            },

          })
          
        } else {
          Toast.show({
            type: 'error',
            text1: 'Invalid Credentials',
            text2: 'Please check your email or password',
            position: 'top',
            visibilityTime: 3000,
            text1Style: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000'
            },
            text2Style: {
              fontSize:14,
              color: '#6200ee'
            },

          })
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
            mode='outlined'
            style={global.input}
            label="Email"
            value={props.values.email}
            onChangeText={props.handleChange('email')}
          />

          {/* Password input with show/hide toggle */}
          <TextInput
            style={global.input}
            mode='outlined'
            label="Password"
            secureTextEntry={!showPassword}
            value={props.values.password}
            onChangeText={props.handleChange('password')}
            right = {
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword(!showPassword)}
            />}
          />

          {/* Login button */}
          <Button
          icon="login"
          mode='contained'
          buttonColor="#b38bebff"
          textColor="white"
          labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
          onPress={props.handleSubmit}
        
          >Login</Button>
        
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
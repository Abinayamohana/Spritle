import React, { useContext } from "react";
import {
  View,
  Alert,
  Image,
  Text,
} from "react-native";
import global from "../styles/global";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppContext } from "../context/AppContext";
import { Button, TextInput } from 'react-native-paper';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  // Access the context to get the registerUser function
  const { registerUser } = useContext(AppContext);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(4, "Min 4 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await registerUser(values);
          Alert.alert("Registration Successful", "Please login now");
          resetForm();
          navigation.replace("Login");
        } catch (err) {
          Alert.alert("Error", err.message);
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        setTouched,
        touched,
        errors,
        values,
      }) => (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 70}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled" // Allows tapping outside to dismiss keyboard
          >
            <View style={global.container}>
              <View style={global.formBox}>
                <Image
                  source={require("../../assets/login.jpg")}
                  style={global.logoImage}
                />
                <Text style={global.heading}>Sign Up! </Text>

                {/* Name */}
                <TextInput
                  style={global.input}
                  mode="outlined"
                  label="Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {touched.name && errors.name && (
                  <Text style={global.error}>{errors.name}</Text>
                )}

                {/* Email */}
                <TextInput
                  style={global.input}
                  mode="outlined"
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text style={global.error}>{errors.email}</Text>
                )}

                {/* Password */}
                  <TextInput
                    style={global.input}
                    mode="outlined"
                    label="Password"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    right={
                    <TextInput.Icon
                      icon={showPassword ? "eye" : "eye-off"}
                      onPress={() => setShowPassword(!showPassword)}
                    />}
                  />
                {touched.password && errors.password && (
                  <Text style={global.error}>{errors.password}</Text>
                )}

                {/*  Force touched on submit */}
                <Button
                  mode="contained"
                  buttonColor="#b38bebff"
                  textColor="white"
                  labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
                  onPress={() => {
                    setTouched({
                      name: true,
                      email: true,
                      password: true,
                    });
                    handleSubmit();
                  }}
                >
                 Register
                </Button>
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <Text style={global.linkText}>
                    Already have an account? Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

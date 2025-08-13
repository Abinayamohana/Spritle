import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import global from "../styles/global";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";


// Profile screen components
export default function ProfileScreen({ navigation }) {
  const { user, logoutUser, profileImage, updateProfileImage } =
    useContext(AppContext);

  // pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    // Update profile image if user picked one
    if (!result.canceled) updateProfileImage(result.assets[0].uri);
  };

  // Capture image from camera
  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission denied!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    // Update profile image if user captured one
    if (!result.canceled) updateProfileImage(result.assets[0].uri);
  };

  return (

    <View style={global.profileContainer}>
      {/* Profile title */}
      <Text style={global.title}>Profile</Text>
      {/* Profile image or placeholder */}
      <View style={global.imageWrapper}>
        <TouchableOpacity onPress={captureImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={global.image} />
          ) : (
            <View style={global.placeholder}>
              <Ionicons name="person-circle-outline" size={100} color="#d2b9f5ff" />
              <Text style={global.placeholderText}>No Image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Upload and delete image buttons */}
      <View style={global.iconContainer}>
        <TouchableOpacity onPress={pickImage} style={global.iconButton}>
          <Ionicons name="cloud-upload-outline" size={24} color="#6200ee" />
        </TouchableOpacity>

        {profileImage && (
          <TouchableOpacity
            onPress={() => updateProfileImage(null)}
            style={global.iconButton}
          >
            <Ionicons name="trash-outline" size={24} color="#6200ee" />
          </TouchableOpacity>
        )}
      </View>

      {/* User details card */}
      <View style={global.detailsCard}>
        <Text style={global.detailLabel}>Name</Text>
        <Text style={global.detailValue}>{user?.name}</Text>
        <Text style={global.detailLabel}>Email</Text>
        <Text style={global.detailValue}>{user?.email}</Text>

        {/* Logout button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#b38bebff",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            // marginHorizontal: 40,
            marginTop: 10,
            elevation: 5,
            marginBottom: 40,
          }}
          onPress={logoutUser}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Logout
          </Text>


        </TouchableOpacity>
       
  
      </View>
    </View>
  );
}

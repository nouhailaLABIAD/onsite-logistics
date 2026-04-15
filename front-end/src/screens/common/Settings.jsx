// src/screens/common/Settings.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import styles from "../../styles/settingsStyle";

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      {/* Edit Profile */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.menuItem}
      >
        <Text style={styles.menuIcon}>👤</Text>
        <Text style={styles.menuText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Change Password */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ChangePassword")}
        style={styles.menuItem}
      >
        <Text style={styles.menuIcon}>🔒</Text>
        <Text style={styles.menuText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;
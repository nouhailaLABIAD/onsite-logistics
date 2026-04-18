// src/screens/common/Settings.jsx

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import styles from "../../styles/settingsStyle";

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const MENU_ITEMS = [
    {
      icon: "👤",
      label: "Edit Profile",
      subtitle: "Update your name and email",
      onPress: () => navigation.navigate("Profile"),
    },
    {
      icon: "🔒",
      label: "Change Password",
      subtitle: "Keep your account secure",
      onPress: () => navigation.navigate("ChangePassword"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getInitials(user?.fullName)}</Text>
          </View>
          <Text style={styles.userName}>{user?.fullName}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
          </View>
        </View>

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>Account</Text>

        {/* MENU ITEMS */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuIconBox}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                </View>

                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuText}>{item.label}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>

                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>

              {/* Divider entre les items sauf le dernier */}
              {index < MENU_ITEMS.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪  Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
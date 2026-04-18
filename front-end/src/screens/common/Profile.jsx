// src/screens/profile/Profile.jsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import { logout } from "../../redux/authSlice";
import styles from "../../styles/profileStyle";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await AuthAPI.patch("/users/profile", { fullName, email });
      dispatch({ type: "auth/updateUser", payload: res.data });
      setIsEditing(false);
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* AVATAR HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
          </View>

          <Text style={styles.name}>
            {isEditing ? "Edit Profile" : fullName}
          </Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.role?.toUpperCase()}</Text>
          </View>
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>

          {/* FULL NAME */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            {isEditing ? (
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                placeholderTextColor="#C4C4C4"
                placeholder="Enter your name"
              />
            ) : (
              <Text style={styles.infoValue}>{fullName}</Text>
            )}
          </View>

          <View style={styles.divider} />

          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#C4C4C4"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.infoValue}>{email}</Text>
            )}
          </View>

        </View>

        {/* EDIT / SAVE BUTTON */}
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>✏️  Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, loading && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>💾  Save</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* CHANGE PASSWORD */}
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.outlineButtonText}>🔒  Change Password</Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪  Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
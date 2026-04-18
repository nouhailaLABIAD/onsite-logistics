// src/screens/auth/ChangePassword.jsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthAPI from "../../services/AuthAPI";
import styles from "../../styles/changePasswordStyle";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await AuthAPI.patch("/users/password", {
        oldPassword,
        newPassword,
      });
      Alert.alert("Success", res.data.message || "Password updated");
      setOldPassword("");
      setNewPassword("");
      navigation.goBack();
    } catch (err) {
      console.log("PASSWORD ERROR:", err.response?.data);
      Alert.alert("Error", err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>🔒</Text>
        </View>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>
          Keep your account safe and secure
        </Text>
      </View>

      {/* FORM CARD */}
      <View style={styles.card}>

        {/* OLD PASSWORD */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            placeholderTextColor="#C4C4C4"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
        </View>

        {/* NEW PASSWORD */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor="#C4C4C4"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleChange}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save Password</Text>
        )}
      </TouchableOpacity>

      {/* BACK LINK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default ChangePassword;
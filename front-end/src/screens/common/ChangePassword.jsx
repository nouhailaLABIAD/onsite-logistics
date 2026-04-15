import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
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
      <Text style={styles.title}>🔒 Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Old password"
        placeholderTextColor="#999"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="New password"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChange} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Save Password"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangePassword;
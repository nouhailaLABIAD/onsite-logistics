// src/screens/auth/RegisterScreen.jsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/registerStyle.js";
import AuthAPI from "../services/AuthAPI";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("receiver");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await AuthAPI.post("/auth/register", {
        fullName,
        email,
        password,
        role,
      });
      console.log("REGISTER SUCCESS:", res.data);
      navigation.navigate("Login");
    } catch (err) {
      console.log("❌ ERROR FULL:", err);
      console.log("❌ ERROR DATA:", err?.response?.data);
      const msg = err?.response?.data?.message || "Register failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const ROLES = [
    { label: "🚚  Driver", value: "driver" },
    { label: "📦  Receiver", value: "receiver" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>📝</Text>
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join OnSite Logistics and get started
          </Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>

          {/* FULL NAME */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#C4C4C4"
            />
          </View>

          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. john@email.com"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#C4C4C4"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#C4C4C4"
            />
          </View>

          {/* ROLE */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Role</Text>
            <View style={styles.roleContainer}>
              {ROLES.map((r) => (
                <TouchableOpacity
                  key={r.value}
                  style={[
                    styles.roleBox,
                    role === r.value && styles.roleSelected,
                  ]}
                  onPress={() => setRole(r.value)}
                >
                  <Text
                    style={[
                      styles.roleText,
                      role === r.value && styles.roleTextSelected,
                    ]}
                  >
                    {r.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ERROR */}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️  {error}</Text>
            </View>
          ) : null}

        </View>

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* FOOTER */}
        <Text style={styles.footerText}>
          Already have an account?
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.linkText}
          >
            {" "}Login
          </Text>
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
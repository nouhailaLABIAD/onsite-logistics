// src/screens/auth/LoginScreen.jsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styles from "../styles/loginStyle";
import useAuth from "../hooks/useAuth";

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useAuth();
  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      console.log("USER READY:", user);
      navigation.reset({
        index: 0,
        routes: [{ name: "App" }],
      });
    }
  }, [user]);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>🔐</Text>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>

      {/* FORM CARD */}
      <View style={styles.card}>

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

        {/* ERROR */}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️  {error}</Text>
          </View>
        ) : null}

      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* FOOTER */}
      <Text style={styles.footerText}>
        Don't have an account?
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.linkText}
        >
          {" "}Sign Up
        </Text>
      </Text>

    </SafeAreaView>
  );
};

export default LoginScreen;
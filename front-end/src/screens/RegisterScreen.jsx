// src/screens/RegisterScreen.jsx

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/registerStyle.js";
import AuthAPI from "../services/AuthAPI";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("receiver"); // default role

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

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Create Account</Text>

      <View style={styles.form}>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

        {/* ROLE */}
        <View style={styles.roleContainer}>

          <TouchableOpacity
            style={[
              styles.roleBox,
              role === "driver" && styles.roleSelected,
            ]}
            onPress={() => setRole("driver")}
          >
            <Text>Driver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleBox,
              role === "receiver" && styles.roleSelected,
            ]}
            onPress={() => setRole("receiver")}
          >
            <Text>Receiver</Text>
          </TouchableOpacity>

        </View>

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.linkText}
          >
            {" "}Login
          </Text>
        </Text>

      </View>

    </SafeAreaView>
  );
};

export default RegisterScreen;
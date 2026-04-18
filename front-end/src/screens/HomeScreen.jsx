// src/screens/auth/HomeScreen.jsx

import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styles from "../styles/homeStyle.js";

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigation.replace("App");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>

      {/* LOGO PLACEHOLDER */}
      <View style={styles.logoCircle}>
        <Text style={styles.logoIcon}>🚚</Text>
      </View>

      {/* TEXTS */}
      <Text style={styles.title}>OnSite Logistics</Text>
      <Text style={styles.subtitle}>
        Manage internal deliveries in real-time
      </Text>

      {/* BADGE */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>⚡ Fast · Reliable · Real-time</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <Text style={styles.footer}>
        Powered by OnSite © 2024
      </Text>

    </SafeAreaView>
  );
};

export default HomeScreen;
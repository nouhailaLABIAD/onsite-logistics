// src/screens/auth/HomeScreen.jsx

import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styles from "../styles/homeStyle.js";

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);

  // 🔥 Redirige immédiatement si déjà authentifié
  useEffect(() => {
    if (user) {
      navigation.replace("App");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.image}
        />
      </View> */}

      <Text style={styles.title}>OnSite Logistics</Text>

      <Text style={styles.subtitle}>
        Manage internal deliveries in real-time 🚚
      </Text>

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

    </SafeAreaView>
  );
};

export default HomeScreen;
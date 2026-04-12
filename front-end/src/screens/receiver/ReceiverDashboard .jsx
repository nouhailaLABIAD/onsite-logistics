// src/screens/receiver/ReceiverDashboard.jsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReceiverDashboard = ({ navigation }) => {

  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        📦 Receiver Dashboard
      </Text>

      <Text style={{ marginTop: 10 }}>
        Welcome Receiver
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 30,
          backgroundColor: "red",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default ReceiverDashboard;
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

      

    </SafeAreaView>
  );
};

export default ReceiverDashboard;
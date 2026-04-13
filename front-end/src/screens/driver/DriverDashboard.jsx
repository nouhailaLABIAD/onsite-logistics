import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DriverDashboard = ({ navigation }) => {

  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🚚 Driver Dashboard
      </Text>

      <Text style={{ marginTop: 10 }}>
        Welcome Driver
      </Text>

      {/* 🔥 BOUTON TRIPS */}
      <TouchableOpacity
        onPress={() => {
          console.log("GO TO TRIPS");
          navigation.navigate("App", { screen: "Trips" });
        }}
        style={{
          marginTop: 20,
          backgroundColor: "#6C63FF",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Go to Trips</Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};

export default DriverDashboard;
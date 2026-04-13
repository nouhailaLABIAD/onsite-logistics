import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import AuthAPI from "../../services/AuthAPI";

const VehiclesScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH VEHICLES
  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const res = await AuthAPI.get("/vehicles");

      setVehicles(res.data);
    } catch (err) {
      console.log("ERROR VEHICLES:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ⭐ SOLUTION 1 : REFRESH À CHAQUE FOCUS
  useFocusEffect(
    useCallback(() => {
      fetchVehicles();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🚗 Vehicles List
      </Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginTop: 10,
              backgroundColor: "#f2f2f2",
              borderRadius: 10,
            }}
          >
            <Text>🚘 Plate: {item.plateNumber}</Text>
            <Text>⚡ Status: {item.status}</Text>
          </View>
        )}
      />

    </SafeAreaView>
  );
};

export default VehiclesScreen;
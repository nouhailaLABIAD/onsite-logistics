import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import AuthAPI from "../../services/AuthAPI";
import styles from "../../styles/vehiclesStyle";

const VehiclesScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      fetchVehicles();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🚗 Vehicles List</Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.plateText}>🚘 Plate: {item.plateNumber}</Text>
            <Text style={styles.statusText}>⚡ Status: {item.status}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default VehiclesScreen;
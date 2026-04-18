// src/screens/admin/VehiclesScreen.jsx

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
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

  const getStatusColor = (status) => {
    if (status === "available") return "#10B981";
    if (status === "in_use") return "#F59E0B";
    if (status === "maintenance") return "#EF4444";
    return "#9CA3AF";
  };

  const getStatusBg = (status) => {
    if (status === "available") return "#F0FDF4";
    if (status === "in_use") return "#FFFBEB";
    if (status === "maintenance") return "#FEF2F2";
    return "#F3F4F6";
  };

  const getStatusIcon = (status) => {
    if (status === "available") return "✅";
    if (status === "in_use") return "🚦";
    if (status === "maintenance") return "🔧";
    return "❓";
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading vehicles...</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>

      {/* TOP ROW */}
      <View style={styles.cardTopRow}>
        <View style={styles.vehicleLeft}>
          <View style={styles.vehicleIconBox}>
            <Text style={styles.vehicleIcon}>🚘</Text>
          </View>
          <View>
            <Text style={styles.plateLabel}>Plate Number</Text>
            <Text style={styles.plateText}>{item.plateNumber}</Text>
          </View>
        </View>

        {/* STATUS BADGE */}
        <View style={[styles.statusBadge, { backgroundColor: getStatusBg(item.status) }]}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status?.replace("_", " ").toUpperCase()}
          </Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View style={styles.cardDivider} />

      {/* BOTTOM ROW */}
      <View style={styles.cardBottomRow}>
        <Text style={styles.vehicleId}>ID #{item.id}</Text>
        <View style={[styles.dot, { backgroundColor: getStatusColor(item.status) }]} />
      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Vehicles</Text>
          <Text style={styles.headerSubtitle}>
            {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} registered
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add Vehicle")}
        >
          <Text style={styles.addButtonText}>＋ Add</Text>
        </TouchableOpacity>
      </View>

      {/* STATS ROW */}
      

      {/* LIST */}
      {vehicles.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🚗</Text>
          <Text style={styles.emptyTitle}>No vehicles yet</Text>
          <Text style={styles.emptySubtitle}>Add a vehicle to get started</Text>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

    </SafeAreaView>
  );
};

export default VehiclesScreen;
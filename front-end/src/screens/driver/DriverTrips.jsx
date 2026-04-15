import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import styles from "../../styles/driverTripsStyle";

const DriverTrips = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  // 🎨 STATUS COLORS (respecte le thème)
  const getStatusColor = (status) => {
    if (status === "pending") return "#6c757d";   // gray
    if (status === "accepted") return "#007bff";  // blue (thème principal)
    if (status === "in_progress") return "#fd7e14"; // orange
    if (status === "completed") return "#28a745";   // green
    return "#000";
  };

  // 🔥 FETCH MISSIONS
  const fetchMissions = async () => {
    try {
      setLoading(true);
      const res = await AuthAPI.get("/missions");
      const filtered = res.data.filter(
        (m) =>
          m.driverId === null || Number(m.driverId) === Number(user?.id)
      );
      setMissions(filtered);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 ACCEPT
  const handleAccept = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/assign`, { driverId: user.id });
      await AuthAPI.patch(`/missions/${id}/status`, { status: "accepted" });
      fetchMissions();
    } catch (err) {
      console.log("ACCEPT ERROR:", err.response?.data);
    }
  };

  // 🚀 START
  const handleStart = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/status`, { status: "in_progress" });
      fetchMissions();
    } catch (err) {
      console.log("START ERROR:", err.response?.data);
    }
  };

  // 🚀 COMPLETE
  const handleComplete = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/status`, { status: "completed" });
      fetchMissions();
    } catch (err) {
      console.log("COMPLETE ERROR:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const available = missions.filter((m) => m.status === "pending");
  const myMissions = missions.filter(
    (m) => Number(m.driverId) === Number(user.id)
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>📍 From: {item.pickupLocation}</Text>
      <Text style={styles.cardText}>📦 To: {item.dropoffLocation}</Text>
      <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
        ⚡ Status: {item.status}
      </Text>
      <Text style={styles.priorityText}>🔥 Priority: {item.priority}</Text>

      {/* ACCEPT */}
      {item.status === "pending" && !item.driverId && (
        <TouchableOpacity
          onPress={() => handleAccept(item.id)}
          style={[styles.button, { backgroundColor: "#fd7e14" }]} // orange
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      )}

      {/* START */}
      {item.status === "accepted" && Number(item.driverId) === Number(user.id) && (
        <TouchableOpacity
          onPress={() => handleStart(item.id)}
          style={[styles.button, { backgroundColor: "#28a745" }]} // green
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

      {/* COMPLETE */}
      {item.status === "in_progress" && Number(item.driverId) === Number(user.id) && (
        <TouchableOpacity
          onPress={() => handleComplete(item.id)}
          style={[styles.button, { backgroundColor: "#007bff" }]} // blue
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      )}

      {/* COMPLETED BADGE */}
      {item.status === "completed" && (
        <Text style={styles.completedBadge}>✅ Completed</Text>
      )}
    </View>
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
      <Text style={styles.title}>🚚 Driver Dashboard</Text>

      <Text style={styles.sectionTitle}>📦 Available Missions</Text>
      <FlatList
        data={available}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>🚚 My Missions</Text>
      <FlatList
        data={myMissions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DriverTrips;
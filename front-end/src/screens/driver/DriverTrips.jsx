// src/screens/driver/DriverTrips.jsx

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
  const [activeTab, setActiveTab] = useState("available"); // 👈 TAB STATE
  const user = useSelector((state) => state.auth.user);

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return { color: "#6B7280", bg: "#F3F4F6", label: "Pending" };
      case "accepted":
        return { color: "#4F46E5", bg: "#EEF2FF", label: "Accepted" };
      case "in_progress":
        return { color: "#D97706", bg: "#FFFBEB", label: "In Progress" };
      case "completed":
        return { color: "#059669", bg: "#ECFDF5", label: "Completed" };
      default:
        return { color: "#6B7280", bg: "#F3F4F6", label: status };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return { color: "#EF4444", bg: "#FEF2F2", label: "🔥 High" };
      case "medium":
        return { color: "#D97706", bg: "#FFFBEB", label: "⚡ Medium" };
      case "low":
        return { color: "#059669", bg: "#ECFDF5", label: "🟢 Low" };
      default:
        return { color: "#6B7280", bg: "#F3F4F6", label: priority };
    }
  };

  const fetchMissions = async () => {
    try {
      setLoading(true);
      const res = await AuthAPI.get("/missions");
      const filtered = res.data.filter(
        (m) => m.driverId === null || Number(m.driverId) === Number(user?.id)
      );
      setMissions(filtered);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/assign`, { driverId: user.id });
      await AuthAPI.patch(`/missions/${id}/status`, { status: "accepted" });
      fetchMissions();
    } catch (err) {
      console.log("ACCEPT ERROR:", err.response?.data);
    }
  };

  const handleStart = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/status`, { status: "in_progress" });
      fetchMissions();
    } catch (err) {
      console.log("START ERROR:", err.response?.data);
    }
  };

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
    (m) => Number(m.driverId) === Number(user?.id)
  );

  const currentData = activeTab === "available" ? available : myMissions;

  const renderItem = ({ item }) => {
    const statusConfig = getStatusConfig(item.status);
    const priorityConfig = getPriorityConfig(item.priority);

    return (
      <View style={styles.card}>

        {/* STATUS + PRIORITY ROW */}
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: statusConfig.bg }]}>
            <Text style={[styles.badgeText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: priorityConfig.bg }]}>
            <Text style={[styles.badgeText, { color: priorityConfig.color }]}>
              {priorityConfig.label}
            </Text>
          </View>
        </View>

        {/* PICKUP */}
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Pickup</Text>
            <Text style={styles.locationValue}>{item.pickupLocation}</Text>
          </View>
        </View>

        <View style={styles.locationDivider} />

        {/* DROPOFF */}
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📦</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Dropoff</Text>
            <Text style={styles.locationValue}>{item.dropoffLocation}</Text>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        {item.status === "pending" && !item.driverId && (
          <TouchableOpacity
            onPress={() => handleAccept(item.id)}
            style={[styles.actionButton, styles.acceptButton]}
          >
            <Text style={styles.actionButtonText}>✋  Accept Mission</Text>
          </TouchableOpacity>
        )}

        {item.status === "accepted" &&
          Number(item.driverId) === Number(user?.id) && (
            <TouchableOpacity
              onPress={() => handleStart(item.id)}
              style={[styles.actionButton, styles.startButton]}
            >
              <Text style={styles.actionButtonText}>🚀  Start Mission</Text>
            </TouchableOpacity>
          )}

        {item.status === "in_progress" &&
          Number(item.driverId) === Number(user?.id) && (
            <TouchableOpacity
              onPress={() => handleComplete(item.id)}
              style={[styles.actionButton, styles.completeButton]}
            >
              <Text style={styles.actionButtonText}>✅  Complete Mission</Text>
            </TouchableOpacity>
          )}

        {item.status === "completed" && (
          <View style={styles.completedBox}>
            <Text style={styles.completedText}>✅  Mission Completed</Text>
          </View>
        )}

      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyText}>No missions here</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <Text style={styles.subtitle}>
          {missions.length} mission{missions.length !== 1 ? "s" : ""} total
        </Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "available" && styles.tabActive]}
          onPress={() => setActiveTab("available")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "available" && styles.tabTextActive,
            ]}
          >
            📦 Available
          </Text>
          {available.length > 0 && (
            <View style={[
              styles.tabBadge,
              activeTab === "available" && styles.tabBadgeActive
            ]}>
              <Text style={[
                styles.tabBadgeText,
                activeTab === "available" && styles.tabBadgeTextActive
              ]}>
                {available.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "my" && styles.tabActive]}
          onPress={() => setActiveTab("my")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "my" && styles.tabTextActive,
            ]}
          >
            🚚 My Missions
          </Text>
          {myMissions.length > 0 && (
            <View style={[
              styles.tabBadge,
              activeTab === "my" && styles.tabBadgeActive
            ]}>
              <Text style={[
                styles.tabBadgeText,
                activeTab === "my" && styles.tabBadgeTextActive
              ]}>
                {myMissions.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
      />

    </SafeAreaView>
  );
};

export default DriverTrips;
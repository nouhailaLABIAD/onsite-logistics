// src/screens/driver/DriverDashboard.jsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import { logout } from "../../redux/authSlice";
import styles from "../../styles/driverDashboardStyle";

const DriverDashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    accepted: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchDriverMissions();
  }, []);

  const fetchDriverMissions = async () => {
    try {
      const res = await AuthAPI.get("/missions");
      const myMissions = res.data.filter(
        (m) => Number(m.driverId) === Number(user?.id)
      );
      setMissions(myMissions);
      setStats({
        accepted: myMissions.filter((m) => m.status === "accepted").length,
        inProgress: myMissions.filter((m) => m.status === "in_progress").length,
        completed: myMissions.filter((m) => m.status === "completed").length,
      });
    } catch (err) {
      console.log("Error fetching missions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Login");
  };

  const getStatusConfig = (status) => {
    switch (status) {
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

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  const recentMissions = missions.slice(0, 3);

  const STATS = [
    { label: "Accepted", value: stats.accepted, color: "#4F46E5", bg: "#EEF2FF" },
    { label: "In Progress", value: stats.inProgress, color: "#D97706", bg: "#FFFBEB" },
    { label: "Completed", value: stats.completed, color: "#059669", bg: "#ECFDF5" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getInitials(user?.fullName)}</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.title}>{user?.fullName || "Driver"}</Text>
          </View>
        </View>

        {/* STATS */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsContainer}>
          {STATS.map((stat) => (
            <View
              key={stat.label}
              style={[styles.statCard, { backgroundColor: stat.bg }]}
            >
              <Text style={[styles.statNumber, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: stat.color }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* RECENT MISSIONS */}
        <Text style={styles.sectionTitle}>Recent Missions</Text>

        {recentMissions.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No missions yet</Text>
          </View>
        ) : (
          recentMissions.map((mission) => {
            const statusConfig = getStatusConfig(mission.status);
            return (
              <View key={mission.id} style={styles.missionCard}>

                <View style={styles.missionRow}>
                  <Text style={styles.missionIcon}>📍</Text>
                  <View style={styles.missionInfo}>
                    <Text style={styles.missionLabel}>Pickup</Text>
                    <Text style={styles.missionValue}>{mission.pickupLocation}</Text>
                  </View>
                </View>

                <View style={styles.missionDivider} />

                <View style={styles.missionRow}>
                  <Text style={styles.missionIcon}>📦</Text>
                  <View style={styles.missionInfo}>
                    <Text style={styles.missionLabel}>Dropoff</Text>
                    <Text style={styles.missionValue}>{mission.dropoffLocation}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusConfig.bg },
                  ]}
                >
                  <Text style={[styles.statusText, { color: statusConfig.color }]}>
                    {statusConfig.label}
                  </Text>
                </View>

              </View>
            );
          })
        )}

        {/* BUTTONS */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("App", { screen: "Trips" })}
        >
          <Text style={styles.primaryButtonText}>View All Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪  Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverDashboard;
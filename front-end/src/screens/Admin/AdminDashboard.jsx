// src/screens/admin/AdminDashboard.jsx

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
import styles from "../../styles/adminDashboardStyle";

const AdminDashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    totalMissions: 0,
    totalVehicles: 0,
    totalDrivers: 0,
    pendingMissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const [missionsRes, vehiclesRes, usersRes] = await Promise.all([
        AuthAPI.get("/missions"),
        AuthAPI.get("/vehicles"),
        AuthAPI.get("/users"),
      ]);

      const missions = missionsRes.data;
      const vehicles = vehiclesRes.data;
      const users = usersRes.data;
      const drivers = users.filter((u) => u.role === "driver");

      setStats({
        totalMissions: missions.length,
        totalVehicles: vehicles.length,
        totalDrivers: drivers.length,
        pendingMissions: missions.filter((m) => m.status === "pending").length,
      });
    } catch (err) {
      console.log("Error fetching admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.title}>
              {user?.fullName || "Administrator"}
            </Text>
          </View>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeIcon}>🛡️</Text>
          </View>
        </View>

        {/* ROLE BADGE */}
        <View style={styles.roleBadgeRow}>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>⚙️  ADMIN PANEL</Text>
          </View>
        </View>

        {/* STATS GRID */}
        <View style={styles.statsGrid}>

          <View style={[styles.statCard, { borderTopColor: "#4F46E5" }]}>
            <Text style={styles.statIcon}>🗂️</Text>
            <Text style={[styles.statNumber, { color: "#4F46E5" }]}>
              {stats.totalMissions}
            </Text>
            <Text style={styles.statLabel}>Total Missions</Text>
          </View>

          <View style={[styles.statCard, { borderTopColor: "#F59E0B" }]}>
            <Text style={styles.statIcon}>⏳</Text>
            <Text style={[styles.statNumber, { color: "#F59E0B" }]}>
              {stats.pendingMissions}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>

          <View style={[styles.statCard, { borderTopColor: "#10B981" }]}>
            <Text style={styles.statIcon}>🚗</Text>
            <Text style={[styles.statNumber, { color: "#10B981" }]}>
              {stats.totalVehicles}
            </Text>
            <Text style={styles.statLabel}>Vehicles</Text>
          </View>

          <View style={[styles.statCard, { borderTopColor: "#EC4899" }]}>
            <Text style={styles.statIcon}>👤</Text>
            <Text style={[styles.statNumber, { color: "#EC4899" }]}>
              {stats.totalDrivers}
            </Text>
            <Text style={styles.statLabel}>Drivers</Text>
          </View>

        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsContainer}>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("App", { screen: "Create Mission" })}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#EEF2FF" }]}>
              <Text style={styles.actionIcon}>➕</Text>
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Create Mission</Text>
              <Text style={styles.actionSubtitle}>Add a new mission</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.actionDivider} />

         

          <View style={styles.actionDivider} />

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("App", { screen: "Vehicles" })}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#F0FDF4" }]}>
              <Text style={styles.actionIcon}>🚗</Text>
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Vehicles List</Text>
              <Text style={styles.actionSubtitle}>View all vehicles</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("App", { screen: "Add Vehicle" })}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#FDF4FF" }]}>
              <Text style={styles.actionIcon}>🚙</Text>
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Add Vehicle</Text>
              <Text style={styles.actionSubtitle}>Register a new vehicle</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪  Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;
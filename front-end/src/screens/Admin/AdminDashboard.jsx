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
import { useSelector } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import styles from "../../styles/adminDashboardStyle";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
const AdminDashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
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
        AuthAPI.get("/users"), // suppose que cette route existe
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

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Login");
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}> Admin Dashboard</Text>
        <Text style={styles.subtitle}>
          Welcome, {user?.fullName || "Administrator"}!
        </Text>

        {/* STATS CARDS */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalMissions}</Text>
            <Text style={styles.statLabel}>Total Missions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.pendingMissions}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalVehicles}</Text>
            <Text style={styles.statLabel}>Vehicles</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalDrivers}</Text>
            <Text style={styles.statLabel}>Drivers</Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("App", { screen: "Create Mission" })}
        >
          <Text style={styles.actionButtonText}>➕ Create a Mission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("App", { screen: "Vehicles" })}
        >
          <Text style={styles.actionButtonText}>🚗 Vehicles List </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("App", { screen: "Add Vehicle" })}
        >
          <Text style={styles.actionButtonText}>➕ Add Vehicle</Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.actionButtonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;
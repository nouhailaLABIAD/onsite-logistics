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
import styles from "../../styles/driverDashboardStyle";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
const DriverDashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
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
      const accepted = myMissions.filter((m) => m.status === "accepted").length;
      const inProgress = myMissions.filter((m) => m.status === "in_progress").length;
      const completed = myMissions.filter((m) => m.status === "completed").length;
      setStats({ accepted, inProgress, completed });
    } catch (err) {
      console.log("Error fetching missions:", err);
    } finally {
      setLoading(false);
    }
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Login");
  };


  const getStatusColor = (status) => {
    if (status === "accepted") return "#007bff";
    if (status === "in_progress") return "#fd7e14";
    if (status === "completed") return "#28a745";
    return "#6c757d";
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  const recentMissions = missions.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>🚚 Driver Dashboard</Text>
        <Text style={styles.subtitle}>Welcome, {user?.fullName || "Driver"}!</Text>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.accepted}</Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.inProgress}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* RECENT MISSIONS */}
        <Text style={styles.sectionTitle}>Recent Missions</Text>
        {recentMissions.length === 0 ? (
          <Text style={styles.emptyText}>No missions yet</Text>
        ) : (
          recentMissions.map((mission) => (
            <View key={mission.id} style={styles.missionCard}>
              <Text style={styles.missionText}>📍 {mission.pickupLocation}</Text>
              <Text style={styles.missionText}>📦 {mission.dropoffLocation}</Text>
              <Text
                style={[
                  styles.missionText,
                  styles.statusBadge,
                  { color: getStatusColor(mission.status) },
                ]}
              >
                Status: {mission.status}
              </Text>
            </View>
          ))
        )}

        {/* BUTTONS */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("App", { screen: "Trips" })}
        >
          <Text style={styles.buttonText}>View All Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#dc3545", marginTop: 10 }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverDashboard;
// src/screens/receiver/ReceiverDashboard.jsx

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
import styles from "../../styles/receiverDashboardStyle";

const ReceiverDashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    delivered: 0,
  });

  useEffect(() => {
    fetchReceiverParcels();
  }, []);

  const fetchReceiverParcels = async () => {
    try {
      const res = await AuthAPI.get("/missions");
      const myParcels = res.data.filter(
        (m) => Number(m.receiverId) === Number(user?.id)
      );
      setParcels(myParcels);
      setStats({
        pending: myParcels.filter((m) => m.status === "pending").length,
        inProgress: myParcels.filter((m) => m.status === "in_progress").length,
        delivered: myParcels.filter((m) => m.status === "completed").length,
      });
    } catch (err) {
      console.log("Error fetching parcels:", err);
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
      case "pending":
        return { color: "#6B7280", bg: "#F3F4F6", label: "Pending" };
      case "accepted":
        return { color: "#4F46E5", bg: "#EEF2FF", label: "Accepted" };
      case "in_progress":
        return { color: "#D97706", bg: "#FFFBEB", label: "In Transit" };
      case "completed":
        return { color: "#059669", bg: "#ECFDF5", label: "Delivered" };
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

  const recentParcels = parcels.slice(0, 3);

  const STATS = [
    { label: "Pending",    value: stats.pending,    color: "#6B7280", bg: "#F3F4F6" },
    { label: "In Transit", value: stats.inProgress, color: "#D97706", bg: "#FFFBEB" },
    { label: "Delivered",  value: stats.delivered,  color: "#059669", bg: "#ECFDF5" },
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
            <Text style={styles.title}>{user?.fullName || "Receiver"}</Text>
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

        {/* RECENT PARCELS */}
        <Text style={styles.sectionTitle}>Recent Parcels</Text>

        {recentParcels.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No parcels yet</Text>
          </View>
        ) : (
          recentParcels.map((parcel) => {
            const statusConfig = getStatusConfig(parcel.status);
            return (
              <View key={parcel.id} style={styles.parcelCard}>

                <View style={styles.locationRow}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationLabel}>Pickup</Text>
                    <Text style={styles.locationValue}>{parcel.pickupLocation}</Text>
                  </View>
                </View>

                <View style={styles.locationDivider} />

                <View style={styles.locationRow}>
                  <Text style={styles.locationIcon}>📦</Text>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationLabel}>Dropoff</Text>
                    <Text style={styles.locationValue}>{parcel.dropoffLocation}</Text>
                  </View>
                </View>

                <View
                  style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}
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
          onPress={() => navigation.navigate("App", { screen: "Parcels" })}
        >
          <Text style={styles.primaryButtonText}>View All Parcels</Text>
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

export default ReceiverDashboard;
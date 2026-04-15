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
import styles from "../../styles/receiverDashboardStyle";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
const ReceiverDashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
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
      const pending = myParcels.filter((m) => m.status === "pending").length;
      const inProgress = myParcels.filter((m) => m.status === "in_progress").length;
      const delivered = myParcels.filter((m) => m.status === "completed").length;
      setStats({ pending, inProgress, delivered });
    } catch (err) {
      console.log("Error fetching parcels:", err);
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
    if (status === "pending") return "#6c757d";
    if (status === "in_progress") return "#fd7e14";
    if (status === "completed") return "#28a745";
    return "#000";
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#28a745" />
      </SafeAreaView>
    );
  }

  const recentParcels = parcels.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>📦 Receiver Dashboard</Text>
        <Text style={styles.subtitle}>Welcome, {user?.fullName || "Receiver"}!</Text>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.inProgress}</Text>
            <Text style={styles.statLabel}>In Transit</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.delivered}</Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
        </View>

        {/* RECENT PARCELS */}
        <Text style={styles.sectionTitle}>Recent Parcels</Text>
        {recentParcels.length === 0 ? (
          <Text style={styles.emptyText}>No parcels yet</Text>
        ) : (
          recentParcels.map((parcel) => (
            <View key={parcel.id} style={styles.parcelCard}>
              <Text style={styles.parcelText}>📍 From: {parcel.pickupLocation}</Text>
              <Text style={styles.parcelText}>📦 To: {parcel.dropoffLocation}</Text>
              <Text
                style={[
                  styles.parcelText,
                  styles.statusBadge,
                  { color: getStatusColor(parcel.status) },
                ]}
              >
                Status: {parcel.status}
              </Text>
            </View>
          ))
        )}

        {/* BUTTONS */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("App", { screen: "Parcels" })}
        >
          <Text style={styles.buttonText}>View All Parcels</Text>
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

export default ReceiverDashboard;
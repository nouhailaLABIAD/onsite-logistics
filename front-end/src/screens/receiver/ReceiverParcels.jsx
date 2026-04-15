import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import styles from "../../styles/receiverParcelsStyle";

const ReceiverParcels = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  // 🎨 STATUS COLOR (optionnel mais cohérent)
  const getStatusColor = (status) => {
    if (status === "pending") return "#6c757d";
    if (status === "accepted") return "#007bff";
    if (status === "in_progress") return "#fd7e14";
    if (status === "completed") return "#28a745";
    return "#000";
  };

  const fetchMissions = async () => {
    try {
      const res = await AuthAPI.get("/missions");
      const myParcels = res.data.filter(
        (m) => Number(m.receiverId) === Number(user.id)
      );
      setMissions(myParcels);
    } catch (err) {
      console.log("ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📦 My Parcels</Text>

      {missions.length === 0 ? (
        <Text style={styles.emptyText}>No parcels found</Text>
      ) : (
        <FlatList
          data={missions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>📍 From: {item.pickupLocation}</Text>
              <Text style={styles.cardText}>📦 To: {item.dropoffLocation}</Text>
              <Text style={[styles.cardText, styles.statusText, { color: getStatusColor(item.status) }]}>
                ⚡ Status: {item.status}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ReceiverParcels;
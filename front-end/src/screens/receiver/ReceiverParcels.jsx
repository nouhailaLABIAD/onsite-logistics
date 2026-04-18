// src/screens/receiver/ReceiverParcels.jsx

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
import styles from "../../styles/receiverParcelsStyle";

const ReceiverParcels = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const user = useSelector((state) => state.auth.user);

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

  const TABS = [
    { key: "all",         label: "All" },
    { key: "in_progress", label: "In Transit" },
    { key: "completed",   label: "Delivered" },
  ];

  const filteredMissions =
    activeTab === "all"
      ? missions
      : missions.filter((m) => m.status === activeTab);

  const renderItem = ({ item }) => {
    const statusConfig = getStatusConfig(item.status);

    return (
      <View style={styles.card}>

        {/* STATUS BADGE */}
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
          <Text style={[styles.statusBadgeText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
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

      </View>
    );
  };

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
        <Text style={styles.title}>My Parcels</Text>
        <Text style={styles.subtitle}>
          {missions.length} parcel{missions.length !== 1 ? "s" : ""} total
        </Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => {
          const count =
            tab.key === "all"
              ? missions.length
              : missions.filter((m) => m.status === tab.key).length;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
              {count > 0 && (
                <View style={[
                  styles.tabBadge,
                  activeTab === tab.key && styles.tabBadgeActive,
                ]}>
                  <Text style={[
                    styles.tabBadgeText,
                    activeTab === tab.key && styles.tabBadgeTextActive,
                  ]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredMissions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No parcels found</Text>
          </View>
        }
      />

    </SafeAreaView>
  );
};

export default ReceiverParcels;
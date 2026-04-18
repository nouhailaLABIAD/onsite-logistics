// src/screens/receiver/ReceiverMapScreen.jsx

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import { cityCoordinates } from "../../utils/coordinates";
import { MaterialIcons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import styles from "../../styles/receiverMapStyle";

const normalizeCity = (city) => city?.toLowerCase().replace(/\s/g, "");

const socket = io("http://172.20.10.11:3000/tracking");

const LIVE_MISSION_ID = 15;

const ReceiverMapScreen = () => {
  const user = useSelector((state) => state.auth.user);

  const [missions, setMissions] = useState([]);
  const [driverPositions, setDriverPositions] = useState({});
  const [selectedMission, setSelectedMission] = useState(null);

  const fetchMissions = async () => {
    try {
      const res = await AuthAPI.get("/missions");
      const filtered = res.data.filter(
        (m) =>
          Number(m.receiverId) === Number(user.id) &&
          m.status === "in_progress"
      );
      setMissions(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // 🔥 SOCKET - LIVE MISSION
  useEffect(() => {
    socket.on("locationUpdated", (data) => {
      if (Number(data.missionId) !== LIVE_MISSION_ID) return;
      setDriverPositions((prev) => ({
        ...prev,
        [String(data.missionId)]: {
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        },
      }));
    });
    return () => socket.off("locationUpdated");
  }, []);

  // 🚗 FAKE SIMULATION - OTHER MISSIONS
  useEffect(() => {
    const intervals = [];

    missions.forEach((mission) => {
      if (Number(mission.id) === LIVE_MISSION_ID) return;

      const pickup = cityCoordinates[normalizeCity(mission.pickupLocation)];
      const dropoff = cityCoordinates[normalizeCity(mission.dropoffLocation)];

      if (!pickup || !dropoff) return;

      let progress = 0;

      const interval = setInterval(() => {
        progress += 0.03;
        if (progress >= 1) {
          clearInterval(interval);
          return;
        }
        setDriverPositions((prev) => ({
          ...prev,
          [String(mission.id)]: {
            latitude: pickup.latitude + (dropoff.latitude - pickup.latitude) * progress,
            longitude: pickup.longitude + (dropoff.longitude - pickup.longitude) * progress,
          },
        }));
      }, 300);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [missions]);

  return (
    <View style={styles.container}>

      {/* MAP */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.5731,
          longitude: -7.5898,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {missions.map((mission) => {
          const pickup = cityCoordinates[normalizeCity(mission.pickupLocation)];
          const dropoff = cityCoordinates[normalizeCity(mission.dropoffLocation)];

          if (!pickup || !dropoff) return null;

          const id = String(mission.id);
          const isLive = Number(mission.id) === LIVE_MISSION_ID;

          return (
            <React.Fragment key={mission.id}>

              {/* ROUTE */}
              <Polyline
                coordinates={[pickup, dropoff]}
                strokeColor={isLive ? "#4F46E5" : "#D97706"}
                strokeWidth={4}
                lineDashPattern={isLive ? undefined : [8, 4]}
              />

              {/* PICKUP MARKER */}
              <Marker
                coordinate={pickup}
                title="📍 Pickup"
                description={mission.pickupLocation}
              />

              {/* DROPOFF MARKER */}
              <Marker
                coordinate={dropoff}
                title="📦 Dropoff"
                description={mission.dropoffLocation}
                pinColor="green"
              />

              {/* DRIVER MARKER */}
              {driverPositions[id] && (
                <Marker
                  coordinate={driverPositions[id]}
                  title={isLive ? "🔴 Live Driver" : "🟠 Driver"}
                  onPress={() => setSelectedMission(mission)}
                >
                  <View style={[
                    styles.driverMarker,
                    { backgroundColor: isLive ? "#EEF2FF" : "#FFFBEB" }
                  ]}>
                    <MaterialIcons
                      name="local-shipping"
                      size={26}
                      color={isLive ? "#4F46E5" : "#D97706"}
                    />
                  </View>
                </Marker>
              )}

            </React.Fragment>
          );
        })}
      </MapView>

      {/* LEGEND CARD */}
      <View style={styles.legendCard}>
        <Text style={styles.legendTitle}>🗺️ Active Missions</Text>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: "#4F46E5" }]} />
          <Text style={styles.legendText}>Live tracking (WebSocket)</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: "#D97706" }]} />
          <Text style={styles.legendText}>Simulated missions</Text>
        </View>
        <Text style={styles.legendCount}>
          {missions.length} mission{missions.length !== 1 ? "s" : ""} in progress
        </Text>
      </View>

      {/* SELECTED MISSION CARD */}
      {selectedMission && (
        <View style={styles.missionInfoCard}>
          <View style={styles.missionInfoHeader}>
            <Text style={styles.missionInfoTitle}>Mission #{selectedMission.id}</Text>
            <TouchableOpacity onPress={() => setSelectedMission(null)}>
              <Text style={styles.missionInfoClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.missionInfoRow}>
            <Text style={styles.missionInfoIcon}>📍</Text>
            <View>
              <Text style={styles.missionInfoLabel}>Pickup</Text>
              <Text style={styles.missionInfoValue}>{selectedMission.pickupLocation}</Text>
            </View>
          </View>

          <View style={styles.missionInfoDivider} />

          <View style={styles.missionInfoRow}>
            <Text style={styles.missionInfoIcon}>📦</Text>
            <View>
              <Text style={styles.missionInfoLabel}>Dropoff</Text>
              <Text style={styles.missionInfoValue}>{selectedMission.dropoffLocation}</Text>
            </View>
          </View>
        </View>
      )}

      {/* EMPTY STATE */}
      {missions.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No missions in progress</Text>
        </View>
      )}

    </View>
  );
};

export default ReceiverMapScreen;
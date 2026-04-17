import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import { cityCoordinates } from "../../utils/coordinates";
import { MaterialIcons } from "@expo/vector-icons";
import { io } from "socket.io-client";

const normalizeCity = (city) =>
  city?.toLowerCase().replace(/\s/g, "");

const socket = io("http://192.168.1.237:3000/tracking");

// 👉 mission LIVE (WebSocket)
const LIVE_MISSION_ID = 15;

const ReceiverMapScreen = () => {
  const user = useSelector((state) => state.auth.user);

  const [missions, setMissions] = useState([]);
  const [driverPositions, setDriverPositions] = useState({});

  // 📦 FETCH MISSIONS
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

  // 🔥 SOCKET ONLY FOR LIVE MISSION
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

  // 🚗 FAKE SIMULATION FOR OTHER MISSIONS
  useEffect(() => {
    const intervals = [];

    missions.forEach((mission) => {
      if (Number(mission.id) === LIVE_MISSION_ID) return; // skip live

      const pickup =
        cityCoordinates[normalizeCity(mission.pickupLocation)];
      const dropoff =
        cityCoordinates[normalizeCity(mission.dropoffLocation)];

      if (!pickup || !dropoff) return;

      let progress = 0;

      const interval = setInterval(() => {
        progress += 0.03;

        if (progress >= 1) {
          clearInterval(interval);
          return;
        }

        const latitude =
          pickup.latitude +
          (dropoff.latitude - pickup.latitude) * progress;

        const longitude =
          pickup.longitude +
          (dropoff.longitude - pickup.longitude) * progress;

        setDriverPositions((prev) => ({
          ...prev,
          [String(mission.id)]: { latitude, longitude },
        }));
      }, 300);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [missions]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 33.5731,
          longitude: -7.5898,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {missions.map((mission) => {
          const pickup =
            cityCoordinates[normalizeCity(mission.pickupLocation)];
          const dropoff =
            cityCoordinates[normalizeCity(mission.dropoffLocation)];

          if (!pickup || !dropoff) return null;

          const id = String(mission.id);

          return (
            <React.Fragment key={mission.id}>
              {/* ROUTE */}
              <Polyline
                coordinates={[pickup, dropoff]}
                strokeColor="blue"
                strokeWidth={4}
              />

              {/* START */}
              <Marker coordinate={pickup} />

              {/* END */}
              <Marker coordinate={dropoff} />

              {/* 🚗 DRIVER (LIVE + FAKE) */}
              {driverPositions[id] && (
                <Marker coordinate={driverPositions[id]}>
                  <MaterialIcons
                    name="local-taxi"
                    size={40}
                    color={
                      Number(mission.id) === LIVE_MISSION_ID
                        ? "red"
                        : "orange"
                    }
                  />
                </Marker>
              )}
            </React.Fragment>
          );
        })}
      </MapView>

      {/* LEGEND */}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text>🔴 Mission live (WebSocket)</Text>
        <Text>🟠 Missions simulées</Text>
      </View>
    </View>
  );
};

export default ReceiverMapScreen;
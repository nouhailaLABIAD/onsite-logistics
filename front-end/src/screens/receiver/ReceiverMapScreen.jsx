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

// ⚠️ adapte ton IP backend
const socket = io("http://192.168.1.237:3000/tracking", {
  transports: ["websocket"],
  autoConnect: true,
});

const ReceiverMapScreen = () => {
  const user = useSelector((state) => state.auth.user);

  const [missions, setMissions] = useState([]);
  const [driverPositions, setDriverPositions] = useState({});

  // 📦 FETCH MISSIONS (uniquement receiver connecté)
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
      console.log("ERROR FETCH MISSIONS:", err);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // 🔥 SOCKET LISTENER FIXÉ
  useEffect(() => {
    const handler = (data) => {
      console.log("📡 position reçue:", data);

      setDriverPositions((prev) => ({
        ...prev,
        [String(data.missionId)]: {
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
        },
      }));
    };

    socket.on("locationUpdated", handler);

    return () => {
      socket.off("locationUpdated", handler);
    };
  }, []);

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

          const missionKey = String(mission.id);

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

              {/* 🚗 DRIVER REAL POSITION */}
              {driverPositions[missionKey] && (
                <Marker coordinate={driverPositions[missionKey]}>
                  <MaterialIcons name="local-taxi" size={40} color="red" />
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
        <Text>🚗 Tracking temps réel</Text>
        <Text>📡 WebSocket actif</Text>
        <Text>📍 Receiver uniquement ses missions</Text>
      </View>
    </View>
  );
};

export default ReceiverMapScreen;
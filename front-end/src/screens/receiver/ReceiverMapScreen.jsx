import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import { cityCoordinates } from "../../utils/coordinates";
import { MaterialIcons } from "@expo/vector-icons";

const normalizeCity = (city) =>
  city?.toLowerCase().replace(/\s/g, "");

const ReceiverMapScreen = () => {
  const user = useSelector((state) => state.auth.user);

  const [missions, setMissions] = useState([]);
  const [driverPositions, setDriverPositions] = useState({});

  // 📦 FETCH MISSIONS ONLY FOR THIS RECEIVER
  const fetchMissions = async () => {
    try {
      const res = await AuthAPI.get("/missions");

      const filtered = res.data.filter(
        (m) =>
          m.receiverId === user.id && // 🔥 IMPORTANT FIX
          m.status === "in_progress"
      );

      setMissions(filtered);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchMissions();

    const interval = setInterval(fetchMissions, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🚗 SIMULATION MOVEMENT
  useEffect(() => {
    const intervals = [];

    missions.forEach((mission) => {
      const pickup =
        cityCoordinates[normalizeCity(mission.pickupLocation)];
      const dropoff =
        cityCoordinates[normalizeCity(mission.dropoffLocation)];

      if (!pickup || !dropoff) return;

      let progress = 0;

      const interval = setInterval(() => {
        progress += 0.05; // ⚡ SPEED

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
          [mission.id]: { latitude, longitude },
        }));
      }, 200);

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

              {/* CAR ANIMATION */}
              {driverPositions[mission.id] && (
                <Marker coordinate={driverPositions[mission.id]}>
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
        <Text>🚗 Missions en cours (in_progress)</Text>
        <Text>📍 Vue uniquement pour ce receiver</Text>
      </View>
    </View>
  );
};

export default ReceiverMapScreen;
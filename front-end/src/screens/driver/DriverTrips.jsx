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

const DriverTrips = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  // 🎨 STATUS COLORS
  const getStatusColor = (status) => {
    if (status === "pending") return "gray";
    if (status === "accepted") return "blue";
    if (status === "in_progress") return "orange";
    if (status === "completed") return "green";
    return "black";
  };

  // 🔥 FETCH MISSIONS
  const fetchMissions = async () => {
    try {
      setLoading(true);

      const res = await AuthAPI.get("/missions");

      const filtered = res.data.filter(
        (m) =>
          m.driverId === null ||
          Number(m.driverId) === Number(user?.id)
      );

      setMissions(filtered);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 ACCEPT
  const handleAccept = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/assign`, {
        driverId: user.id,
      });

      await AuthAPI.patch(`/missions/${id}/status`, {
        status: "accepted",
      });

      fetchMissions();
    } catch (err) {
      console.log("ACCEPT ERROR:", err.response?.data);
    }
  };

  // 🚀 START
  const handleStart = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/status`, {
        status: "in_progress",
      });

      fetchMissions();
    } catch (err) {
      console.log("START ERROR:", err.response?.data);
    }
  };

  // 🚀 COMPLETE
  const handleComplete = async (id) => {
    try {
      await AuthAPI.patch(`/missions/${id}/status`, {
        status: "completed",
      });

      fetchMissions();
    } catch (err) {
      console.log("COMPLETE ERROR:", err.response?.data);
    }
  };

  // 🔄 LOAD ON FOCUS (clean)
  useEffect(() => {
    fetchMissions();
  }, []);

  // 📦 AVAILABLE MISSIONS
  const available = missions.filter((m) => m.status === "pending");

  // 🚚 MY MISSIONS
  const myMissions = missions.filter(
    (m) => Number(m.driverId) === Number(user.id)
  );

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
      }}
    >
      <Text>📍 From: {item.pickupLocation}</Text>
      <Text>📦 To: {item.dropoffLocation}</Text>

      <Text style={{ color: getStatusColor(item.status) }}>
        ⚡ Status: {item.status}
      </Text>

      <Text>🔥 Priority: {item.priority}</Text>

      {/* 🟡 ACCEPT */}
      {item.status === "pending" && !item.driverId && (
        <TouchableOpacity
          onPress={() => handleAccept(item.id)}
          style={{
            marginTop: 10,
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white" }}>Accept</Text>
        </TouchableOpacity>
      )}

      {/* 🟢 START */}
      {item.status === "accepted" &&
        Number(item.driverId) === Number(user.id) && (
          <TouchableOpacity
            onPress={() => handleStart(item.id)}
            style={{
              marginTop: 10,
              backgroundColor: "green",
              padding: 10,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Start</Text>
          </TouchableOpacity>
        )}

      {/* 🔵 COMPLETE */}
      {item.status === "in_progress" &&
        Number(item.driverId) === Number(user.id) && (
          <TouchableOpacity
            onPress={() => handleComplete(item.id)}
            style={{
              marginTop: 10,
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>Complete</Text>
          </TouchableOpacity>
        )}

      {/* ✅ DONE */}
      {item.status === "completed" && (
        <Text style={{ marginTop: 10, color: "green" }}>
          ✅ Completed
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🚚 Driver Dashboard
      </Text>

      {/* 📦 AVAILABLE */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        📦 Available Missions
      </Text>

      <FlatList
        data={available}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* 🚚 MY MISSIONS */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        🚚 My Missions
      </Text>

      <FlatList
        data={myMissions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default DriverTrips;
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

const ReceiverParcels = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  const fetchMissions = async () => {
    try {
      const res = await AuthAPI.get("/missions");

      // 🔥 FILTRER PAR RECEIVER
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
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        📦 My Parcels
      </Text>

      {missions.length === 0 ? (
        <Text>No parcels</Text>
      ) : (
        <FlatList
          data={missions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                marginTop: 10,
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
              }}
            >
              <Text>📍 From: {item.pickupLocation}</Text>
              <Text>📦 To: {item.dropoffLocation}</Text>
              <Text>⚡ Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ReceiverParcels;
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthAPI from "../../services/AuthAPI";

const CreateMission = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [priority, setPriority] = useState("medium");

  const [receivers, setReceivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // 🔥 fetch receivers
  const fetchReceivers = async () => {
    const res = await AuthAPI.get("/users/receivers");
    setReceivers(res.data);
  };

  // 🚗 fetch vehicles
  const fetchVehicles = async () => {
    const res = await AuthAPI.get("/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchReceivers();
    fetchVehicles();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await AuthAPI.post("/missions", {
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        priority,
        receiverId: selectedReceiver,
        vehicleId: selectedVehicle, // ⭐ IMPORTANT
      });

      console.log("MISSION CREATED:", res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.data);
    }
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>

      <Text style={{ fontSize: 20 }}>Create Mission</Text>

      <TextInput
        placeholder="Pickup"
        value={pickup}
        onChangeText={setPickup}
        style={{ borderWidth: 1 }}
      />

      <TextInput
        placeholder="Dropoff"
        value={dropoff}
        onChangeText={setDropoff}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      {/* 👤 RECEIVER */}
      <Text>Select Receiver</Text>
      <FlatList
        data={receivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedReceiver(item.id)}
            style={{
              padding: 10,
              backgroundColor: selectedReceiver === item.id ? "green" : "#eee",
              marginBottom: 5,
            }}
          >
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />

      {/* 🚗 VEHICLES */}
      <Text style={{ marginTop: 20 }}>Select Vehicle</Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedVehicle(item.id)}
            style={{
              padding: 10,
              backgroundColor: selectedVehicle === item.id ? "blue" : "#eee",
              marginBottom: 5,
            }}
          >
            <Text>🚗 {item.plateNumber}</Text>
          </TouchableOpacity>
        )}
      />

      {/* CREATE */}
      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: "black",
          padding: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>Create Mission</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default CreateMission;
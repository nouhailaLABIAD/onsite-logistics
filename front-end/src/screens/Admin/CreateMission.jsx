import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthAPI from "../../services/AuthAPI";

const CreateMission = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [priority, setPriority] = useState("medium");

  const [receivers, setReceivers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  // 🔥 FETCH RECEIVERS
  const fetchReceivers = async () => {
    try {
      const res = await AuthAPI.get("/users/receivers");
      setReceivers(res.data);
    } catch (err) {
      console.log("ERROR RECEIVERS:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchReceivers();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await AuthAPI.post("/missions", {
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        priority,
        receiverId: selectedReceiver,
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
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Dropoff"
        value={dropoff}
        onChangeText={setDropoff}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      {/* 🔥 LIST RECEIVERS */}
      <Text>Select Receiver:</Text>

      <FlatList
        data={receivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedReceiver(item.id)}
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor:
                selectedReceiver === item.id ? "green" : "#eee",
            }}
          >
            <Text>
              {item.fullName} ({item.email})
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: "blue",
          padding: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateMission;
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthAPI from "../../services/AuthAPI";
import styles from "../../styles/createMissionStyle";

const CreateMission = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [priority, setPriority] = useState("medium");

  const [receivers, setReceivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchReceivers = async () => {
    const res = await AuthAPI.get("/users/receivers");
    setReceivers(res.data);
  };

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
        vehicleId: selectedVehicle,
      });
      console.log("MISSION CREATED:", res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.data);
    }
  };

  const renderReceiverItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedReceiver(item.id)}
      style={[
        styles.selectItem,
        selectedReceiver === item.id && styles.selectItemSelected,
      ]}
    >
      <Text
        style={[
          styles.selectItemText,
          selectedReceiver === item.id && styles.selectItemTextSelected,
        ]}
      >
        {item.email}
      </Text>
    </TouchableOpacity>
  );

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedVehicle(item.id)}
      style={[
        styles.selectItem,
        selectedVehicle === item.id && styles.selectItemSelected,
      ]}
    >
      <Text
        style={[
          styles.selectItemText,
          selectedVehicle === item.id && styles.selectItemTextSelected,
        ]}
      >
        🚗 {item.plateNumber}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Mission</Text>

      <Text style={styles.label}>Pickup location</Text>
      <TextInput
        placeholder="e.g. Warehouse A"
        placeholderTextColor="#999"
        value={pickup}
        onChangeText={setPickup}
        style={styles.input}
      />

      <Text style={styles.label}>Dropoff location</Text>
      <TextInput
        placeholder="e.g. Office B"
        placeholderTextColor="#999"
        value={dropoff}
        onChangeText={setDropoff}
        style={styles.input}
      />

      <Text style={styles.label}>Select Receiver</Text>
      <FlatList
        data={receivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReceiverItem}
        style={{ marginBottom: 10 }}
      />

      <Text style={styles.label}>Select Vehicle</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVehicleItem}
        style={{ marginBottom: 10 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Mission</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateMission;
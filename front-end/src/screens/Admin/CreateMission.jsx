// src/screens/admin/CreateMission.jsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthAPI from "../../services/AuthAPI";
import styles from "../../styles/createMissionStyle";

const CreateMission = ({ navigation }) => {
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
    if (!pickup || !dropoff || !selectedReceiver || !selectedVehicle) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      await AuthAPI.post("/missions", {
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        priority,
        receiverId: selectedReceiver,
        vehicleId: selectedVehicle,
      });
      Alert.alert("Success", "Mission created successfully!");
      navigation.goBack();
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      Alert.alert("Error", err.response?.data?.message || "Creation failed");
    }
  };

  const PRIORITIES = [
    { label: "🟢  Low",    value: "low",    color: "#10B981", bg: "#F0FDF4", border: "#6EE7B7" },
    { label: "🟡  Medium", value: "medium", color: "#F59E0B", bg: "#FFFBEB", border: "#FCD34D" },
    { label: "🔴  High",   value: "high",   color: "#EF4444", bg: "#FEF2F2", border: "#FCA5A5" },
  ];

  const renderReceiverItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedReceiver(item.id)}
      style={[
        styles.selectItem,
        selectedReceiver === item.id && styles.selectItemSelected,
      ]}
    >
      <View style={styles.selectItemLeft}>
        <View style={[
          styles.selectAvatar,
          selectedReceiver === item.id && styles.selectAvatarSelected,
        ]}>
          <Text style={styles.selectAvatarText}>
            {item.email?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[
          styles.selectItemText,
          selectedReceiver === item.id && styles.selectItemTextSelected,
        ]}>
          {item.email}
        </Text>
      </View>
      {selectedReceiver === item.id && (
        <Text style={styles.checkIcon}>✓</Text>
      )}
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
      <View style={styles.selectItemLeft}>
        <View style={[
          styles.selectAvatar,
          selectedVehicle === item.id && styles.selectAvatarSelected,
        ]}>
          <Text style={styles.selectAvatarText}>🚗</Text>
        </View>
        <Text style={[
          styles.selectItemText,
          selectedVehicle === item.id && styles.selectItemTextSelected,
        ]}>
          {item.plateNumber}
        </Text>
      </View>
      {selectedVehicle === item.id && (
        <Text style={styles.checkIcon}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Mission</Text>
          <Text style={styles.headerSubtitle}>
            Fill in the details to create a new mission
          </Text>
        </View>

        {/* LOCATIONS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📍 Locations</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Pickup Location</Text>
            <TextInput
              placeholder="e.g. Warehouse A"
              placeholderTextColor="#C4C4C4"
              value={pickup}
              onChangeText={setPickup}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dropoff Location</Text>
            <TextInput
              placeholder="e.g. Office B"
              placeholderTextColor="#C4C4C4"
              value={dropoff}
              onChangeText={setDropoff}
              style={styles.input}
            />
          </View>
        </View>

        {/* PRIORITY CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Priority</Text>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((p) => (
              <TouchableOpacity
                key={p.value}
                onPress={() => setPriority(p.value)}
                style={[
                  styles.priorityBtn,
                  priority === p.value && {
                    backgroundColor: p.bg,
                    borderColor: p.border,
                  },
                ]}
              >
                <Text style={[
                  styles.priorityBtnText,
                  priority === p.value && {
                    color: p.color,
                    fontWeight: "700",
                  },
                ]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* RECEIVERS CARD */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>👤 Select Receiver</Text>
            {selectedReceiver && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>1 selected</Text>
              </View>
            )}
          </View>
          <FlatList
            data={receivers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderReceiverItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListEmptyComponent={
              <Text style={styles.emptyList}>No receivers found</Text>
            }
          />
        </View>

        {/* VEHICLES CARD */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>🚗 Select Vehicle</Text>
            {selectedVehicle && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>1 selected</Text>
              </View>
            )}
          </View>
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderVehicleItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListEmptyComponent={
              <Text style={styles.emptyList}>No vehicles found</Text>
            }
          />
        </View>

        {/* CREATE BUTTON */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>➕  Create Mission</Text>
        </TouchableOpacity>

        {/* CANCEL */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMission;
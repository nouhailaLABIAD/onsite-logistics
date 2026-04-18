// src/screens/admin/AddVehicleScreen.jsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VehicleAPI from "../../services/VehicleAPI";
import styles from "../../styles/addVehicleStyle";

const AddVehicleScreen = ({ navigation }) => {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!plate.trim()) {
      Alert.alert("Error", "Please enter a plate number");
      return;
    }
    try {
      setLoading(true);
      await VehicleAPI.post("/vehicles", {
        plateNumber: plate,
      });
      Alert.alert("Success", "Vehicle added successfully!");
      setPlate("");
      navigation.goBack();
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      Alert.alert("Error", err.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={styles.headerIcon}>🚘</Text>
        </View>
        <Text style={styles.title}>Add Vehicle</Text>
        <Text style={styles.subtitle}>
          Register a new vehicle by entering its plate number
        </Text>
      </View>

      {/* FORM CARD */}
      <View style={styles.card}>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Plate Number</Text>
          <TextInput
            placeholder="e.g. ABC-1234"
            placeholderTextColor="#C4C4C4"
            value={plate}
            onChangeText={setPlate}
            style={styles.input}
            autoCapitalize="characters"
          />
        </View>

        {/* LIVE PREVIEW */}
        {plate.length > 0 && (
          <View style={styles.previewBox}>
            <Text style={styles.previewLabel}>Preview</Text>
            <View style={styles.platePreview}>
              <Text style={styles.platePreviewText}>
                🚘  {plate.toUpperCase()}
              </Text>
            </View>
          </View>
        )}

      </View>

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCreate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Adding..." : "🚗  Add Vehicle"}
        </Text>
      </TouchableOpacity>

      {/* CANCEL */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default AddVehicleScreen;
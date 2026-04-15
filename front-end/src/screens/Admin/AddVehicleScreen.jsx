import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VehicleAPI from "../../services/VehicleAPI";
import styles from "../../styles/addVehicleStyle";

const AddVehicleScreen = ({ navigation }) => {
  const [plate, setPlate] = useState("");

  const handleCreate = async () => {
    try {
      await VehicleAPI.post("/vehicles", {
        plateNumber: plate,
      });
      setPlate("");
      navigation.goBack();
    } catch (err) {
      console.log("ERROR:", err.response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>

      <TextInput
        placeholder="Plate number"
        placeholderTextColor="#999"
        value={plate}
        onChangeText={setPlate}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddVehicleScreen;
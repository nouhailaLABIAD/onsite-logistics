import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import VehicleAPI from "../../services/VehicleAPI";

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
    <View style={{ padding: 20 }}>

      <Text style={{ fontSize: 20 }}>Add Vehicle</Text>

      <TextInput
        placeholder="Plate number"
        value={plate}
        onChangeText={setPlate}
        style={{
          borderWidth: 1,
          marginTop: 10,
          padding: 10,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: "blue",
          padding: 12,
          marginTop: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Create</Text>
      </TouchableOpacity>

    </View>
  );
};

export default AddVehicleScreen;
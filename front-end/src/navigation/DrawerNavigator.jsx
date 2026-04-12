// src/navigation/DrawerNavigator.jsx

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

import TabNavigator from "./TabNavigator";
import DriverTrips from "../screens/driver/DriverTrips";
import ReceiverParcels from "../screens/receiver/ReceiverParcels";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  console.log("ROLE DRAWER:", user?.role);

  // 🔥 ATTEND QUE USER EXISTE
  if (!user) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const role = user.role;

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      
      {/* DASHBOARD COMMUN */}
      <Drawer.Screen name="Dashboard" component={TabNavigator} />

      {/* DRIVER */}
      {role === "driver" && (
        <Drawer.Screen name="Trips" component={DriverTrips} />
      )}

      {/* RECEIVER */}
      {role === "receiver" && (
        <Drawer.Screen name="Parcels" component={ReceiverParcels} />
      )}

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

import CreateMission from "../screens/Admin/CreateMission";
import TabNavigator from "./TabNavigator";
import DriverTrips from "../screens/driver/DriverTrips";
import ReceiverParcels from "../screens/receiver/ReceiverParcels";

import VehiclesScreen from "../screens/Admin/VehiclesScreen";
import AddVehicleScreen from "../screens/Admin/AddVehicleScreen";
import ReceiverMapScreen from "../screens/receiver/ReceiverMapScreen";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  console.log("ROLE DRAWER:", user?.role);

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
  <>
    <Drawer.Screen name="Parcels" component={ReceiverParcels} />
    <Drawer.Screen name="Map" component={ReceiverMapScreen} />
  </>
)}

      {/* ADMIN */}
      {role === "admin" && (
        <>
          <Drawer.Screen name="Create Mission" component={CreateMission} />
          <Drawer.Screen name="Vehicles" component={VehiclesScreen} />
          <Drawer.Screen name="Add Vehicle" component={AddVehicleScreen} />
        </>
      )}

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;